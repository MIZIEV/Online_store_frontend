import React, { useEffect, useState } from "react";
import classes from "./OrderHistory.module.scss";
import { useNavigate } from "react-router";
import { getAllOrdersForUser } from "../../utils/OrderService";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { Order } from "../../shared.types";


const OrderHistory: React.FC = () => {
    const navigator = useNavigate();
    const [orderedList, setOrderedList] = useState<Order[]>([]);
    const email = sessionStorage.getItem("authenticatedEmail");

    const formatCreatedAt = (createdAt: string): string => {
        const date = new Date(createdAt);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // Format the date as YYYY-MM-DD
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${formattedDate} ${hours}:${minutes}`;
    }

    useEffect(() => {
        getAllOrdersForUser(email).then((response) => {
            setOrderedList(response)
            console.log(response)
        })
    }, [])

    const onClickButtonHandler = () => {
        navigator("/phone/catalog")
    }

    return (
        <div className={classes.container}>

            {
                orderedList && orderedList.length > 0 ? (
                    orderedList.map((order) => (
                        <Accordion key={order.id} sx={{ backgroundColor: " #adbc9f", borderRadius: "4px", width: "100%", marginBottom: "5px" }}>
                            <AccordionSummary
                                expandIcon={<GridExpandMoreIcon />}
                                aria-controls={`panel${order.id}-content`}
                                id={`panel${order.id}-header`}
                            >
                                <Typography className={classes.orderTitle}>
                                    Замовлення №{order.id}, створено - {formatCreatedAt(order.createdAt)}, загальна ціна - {order.totalAmount}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {order.phoneList.map((phone) => (
                                        <ListItem key={phone.id}>
                                            <ListItemText
                                                primary={phone.model}
                                                secondary={`Ціна: ${phone.price} грн.`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <div>
                        <h2>Історія замовлень</h2>
                        <p>Історія замовлень порожня. Почніть з першого замовлення в роділі Бестселери</p>
                        <button onClick={onClickButtonHandler}>До покупок</button>
                    </div>
                )
            }
        </div>
    )
}

export default OrderHistory;