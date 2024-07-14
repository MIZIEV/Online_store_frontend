import { Order } from "../shared.types";
import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const ADD_NEW_ORDER = "http://" + HOST_PORT + "/api/order/add"
const GET_ALL_ORDERS_FOR_USER = "http://" + HOST_PORT + "/api/order/list"
const CHANGE_COMPLETE_STATUS = "http://" + HOST_PORT + "/api/order/"


export const addNewOrder = async (order: Order) => {
    try {
        const response = await api.post(ADD_NEW_ORDER, order, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllOrdersForUser = async (email: string) => {
    try {
        const response = await api.get(GET_ALL_ORDERS_FOR_USER + `/${email}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const response = await api.get(GET_ALL_ORDERS_FOR_USER);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const changeCompleteStatus = async (orderId: number) => {
    try {
        const response = await api.patch(`${CHANGE_COMPLETE_STATUS}${orderId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteOrder = async (orderId: number) => {
    try {
        const response = await api.delete(`${CHANGE_COMPLETE_STATUS}${orderId}/remove`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};