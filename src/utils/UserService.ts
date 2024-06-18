import axios from "axios";
import { User } from "../shared.types";
import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const GET_WISH_LIST_FOR_USER = "http://" + HOST_PORT + "/api";
const UPDATE_USER_DATA = "http://" + HOST_PORT + "/api";

export async function getWishListForUser(email: string) {
    try {
        const response = await api.get(`${GET_WISH_LIST_FOR_USER}/${email}/wishList`);
        console.log("GET WISH LIST FUNC")
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function updateUserData(email: string, userData: User) {
    try {
        const response = await api.put(`${UPDATE_USER_DATA}/${email}/data`, userData);
        console.log("UPDATE USER DATA FUNC")
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function changeUserPassword(email: string, password: string) {
    try {
        const response = await api.patch(`${UPDATE_USER_DATA}/${email}/password`, { password: password })
        console.log("CHANGE PASSWORD FUNC")
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};