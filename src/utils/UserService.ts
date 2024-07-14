import { User } from "../shared.types";
import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const GET_WISH_LIST_FOR_USER = "http://" + HOST_PORT + "/api";
const UPDATE_USER_DATA = "http://" + HOST_PORT + "/api";

export async function getWishListForUser(email: string) {
    try {
        const response = await api.get(`${GET_WISH_LIST_FOR_USER}/${email}/wishList`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function updateUserData(email: string, userData: User) {
    try {
        const response = await api.put(`${UPDATE_USER_DATA}/${email}/data`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function changeUserPassword(email: string, password: string) {
    try {
        const response = await api.patch(`${UPDATE_USER_DATA}/${email}/password`, { password: password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function deleteUser(email: string) {
    try {
        const response = await api.delete(`${UPDATE_USER_DATA}/${email}/remove`);
        return response.data;
    } catch (error) {
        throw error;
    }
};