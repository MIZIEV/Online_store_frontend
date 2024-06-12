import axios from "axios";
import { Order } from "../shared.types";
import { HOST } from "./host";

const HOST_PORT = HOST;
const ADD_NEW_ORDER = "http://" + HOST_PORT + "/api/order/add"
const GET_ALL_ORDERS_FOR_USER = "http://" + HOST_PORT + "/api/order/list"
const CHANGE_COMPLETE_STATUS = "http://" + HOST_PORT + "/api/order/"


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

export const getAllOrdersForUser = async (email: string) => {
    try {
        const response = await axios.get(GET_ALL_ORDERS_FOR_USER + `/${email}`)
        console.log("GET ALL ORDERS FO USER FUNC");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const response = await axios.get(GET_ALL_ORDERS_FOR_USER);
        console.log("GET ALL ORDERS  FUNC");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const changeCompleteStatus = async (orderId: number) => {
    try {
        const response = await axios.patch(`${CHANGE_COMPLETE_STATUS}${orderId}`);
        console.log("CHANGE COMPLETE STATUS  FUNC");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteOrder = async (orderId: number) => {
    try {
        const response = await axios.delete(`${CHANGE_COMPLETE_STATUS}${orderId}/remove`);
        console.log("DELETE ORDER  FUNC");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};