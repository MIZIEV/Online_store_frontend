import React, { useEffect, useState } from "react";
import classes from "./OrdersManagment.module.scss"
import { Order } from "../../../shared.types";
import { changeCompleteStatus, deleteOrder, getAllOrders } from "../../../utils/OrderService";
import { Accordion, AccordionDetails, AccordionSummary, FormControlLabel, FormGroup, List, ListItem, ListItemText, Pagination, Switch, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { GetColorName } from "hex-color-to-color-name";

const OrdersManagment: React.FC = () => {

    const [orderList, setOrderList] = useState<Order[]>([]);

    useEffect(() => {
        getAllOrders().then((response) => {
            setOrderList(response);
        })
    }, [])

    const converteDeliveryMethod = (deliveryMethod: string) => {
        if (deliveryMethod === "NEW_POST_OFFICE") {
            return "У відділення Нової пошти"
        } else if (deliveryMethod === "NEW_POST_COURIER") {
            return "Кур'єром Нової пошти"
        } else {
            return "Кур'єром"
        }
    };

    const convertePaymentMethod = (paymentMethod: string) => {
        if (paymentMethod === "ONLINE") {
            return "Онлайн"
        } else {
            return "Готівкою"
        }
    };


    const formatCreatedAt = (createdAt: string): string => {
        const date = new Date(createdAt);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // Format the date as YYYY-MM-DD
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${formattedDate} ${hours}:${minutes}`;
    }

    const converteOrderStatus = (status: boolean) => {
        if (status === true) {
            return "Виконано"
        } else {
            return "В процесі..."
        }
    }

    const changeOrderStatusHandler = async (orderId: number, currentStatus: boolean) => {
        try {
            await changeCompleteStatus(orderId);
            setOrderList(prevOrderList =>
                prevOrderList.map(order =>
                    order.id === orderId ? { ...order, status: !currentStatus } : order
                )
            );
        } catch (error) {
            console.error("Failed to change order status", error);
        }
    };

    const converteColorCodeToColorName = (colorCode: string) => {
        colorCode = colorCode.replace(/^#/, '');
        const colorName = GetColorName(colorCode);
        return colorName ? colorName : "Unknown color code"
    }

    const deleteOrderHandler = (orderId: number) => {

        deleteOrder(orderId);
    }

    return (
        <div className={classes.container}>
            {
                orderList && orderList.length > 0 ? (
                    orderList.map((order) => (
                        <Accordion key={order.id}
                            sx={{ backgroundColor: " #adbc9f", borderRadius: "4px", width: "100%", marginBottom: "5px" }}>
                            <AccordionSummary
                                expandIcon={<GridExpandMoreIcon />}
                                aria-controls={`panel${order.id}-content`}
                                id={`panel${order.id}-header`}
                            >
                                <label className={classes.orderTitle}>
                                    Замовлення №{order.id},
                                    загальна ціна - {order.totalAmount},
                                    створено - {formatCreatedAt(order.createdAt)},
                                    статус замовлення -
                                </label>
                                <label className={classes.orderStatus}>
                                    {converteOrderStatus(order.status)}
                                </label>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    <ListItem >
                                        {`Метод оплати - ${convertePaymentMethod(order.paymentMethod)}, 
                                        Спосіб доставки - ${converteDeliveryMethod(order.deliveryMethod)}`}

                                        <FormGroup sx={{ marginLeft: "10px" }}>
                                            <FormControlLabel control={<Switch
                                                checked={order.status}
                                                onChange={() => changeOrderStatusHandler(order.id, order.status)}
                                                sx={{
                                                    '& .MuiSwitch-thumb': {
                                                        backgroundColor: '#436850'
                                                    },
                                                    '& .Mui-checked + .MuiSwitch-track': {
                                                        backgroundColor: '#767676'
                                                    },
                                                    '& .MuiSwitch-track': {
                                                        backgroundColor: 'white'
                                                    }
                                                }}
                                            />} label="Змінити статус замовлення" />
                                        </FormGroup>
                                        <button
                                            onClick={() => deleteOrderHandler(order.id)}
                                            className={classes.deleteButton}>Видалити замовлення</button>
                                    </ListItem>
                                    <ListItem>
                                        {`ПІБ - ${order.fullName}, номер телефону: ${order.phoneNumber}`}
                                    </ListItem>
                                    {order.phoneList.map((phone) => (
                                        <ListItem key={phone.id}>
                                            <ListItemText
                                                primary={`${phone.model}, 
                                                ${phone.rom.romSize} Гб,
                                                колір: ${converteColorCodeToColorName(phone.color.colorName)}`}
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
                        <button >До покупок</button>
                    </div>
                )
            }
        </div>
    )
}

export default OrdersManagment;