import axios from "axios";

const HOST = "localhost:8090"
const GET_ALL_COMMENTS_URL = "http://" + HOST + "/api/phone/";

export const getAllComments = async (phoneId: number) => {

    try {
        const response = await axios.get(GET_ALL_COMMENTS_URL + `${phoneId}/comment/list`);
        console.log("GET ALL COMMENTS function");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}