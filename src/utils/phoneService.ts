import axios from "axios";

const HOST = "localhost:8090"
const GET_ONE_PHONE_URL = "http://" + HOST + "/api/phone/"


export async function getOnePhone(phoneId: number) {
    try {
        const response = await axios.get(GET_ONE_PHONE_URL + `${phoneId}`);

        console.log("service function - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};