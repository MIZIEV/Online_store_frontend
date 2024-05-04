import axios from "axios";

const HOST = "192.168.31.15:8090"
const GET_ALL_COLORS = "http://" + HOST + "/api/color/list"

export const getAllColors = async () => {
    let url = GET_ALL_COLORS;

    try {
        const responce = await axios.get(url);
        console.log("get all colors function")
        console.log(responce);

        return responce.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

