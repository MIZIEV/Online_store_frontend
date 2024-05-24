import axios from "axios";
import { Order } from "../shared.types";

const HOST = "localhost:8090"
const ADD_NEW_ORDER = "http://" + HOST + "/api/order/add"


export const addNewOrder = async (order: Order) => {
    try {
        const response = await axios.post(ADD_NEW_ORDER, order, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("add new order func")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};