import axios from "axios";

const HOST = "localhost:8090"
const GET_WISH_LIST_FOR_USER = "http://" + HOST + "/api";

export async function getWishListForUser(username: string) {
    try {
        const response = await axios.get(`${GET_WISH_LIST_FOR_USER}/${username}/wishList`);
        console.log("GET WISH LIST FUNC")
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};