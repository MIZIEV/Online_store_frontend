import axios from "axios";
import { User } from "../shared.types";

const HOST = "localhost:8090"
const GET_WISH_LIST_FOR_USER = "http://" + HOST + "/api";
const UPDATE_USER_DATA = "http://" + HOST + "/api";

export async function getWishListForUser(email: string) {
    try {
        const response = await axios.get(`${GET_WISH_LIST_FOR_USER}/${email}/wishList`);
        console.log("GET WISH LIST FUNC")
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export async function updateUserData(email: string, userData: User) {
    try {
        const response = await axios.put(`${UPDATE_USER_DATA}/${email}/data`, userData);
        console.log("UPDATE USER DATA FUNC")
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};