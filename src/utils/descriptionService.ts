import axios from "axios";

const HOST = "localhost:8090"
const GET_DESCRIPTIONS = "http://" + HOST + "/api/phone/"


export async function getDescriptions(phoneId: number) {
    try {
        const response = await axios.get(GET_DESCRIPTIONS + `${phoneId}` + "/description/list");

        console.log("service function - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
