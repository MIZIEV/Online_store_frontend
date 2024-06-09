import axios from "axios";
import { HOST } from "./host";

const HOST_PORT = HOST;
const ADD_NEW_PICTURE = "http://" + HOST_PORT + "/api/phone/";
const GET_ALL_PICTURES = "http://" + HOST_PORT + "/api/phone/";
const DELETE_PICTURE = "http://" + HOST_PORT + "/api/phone/";

export async function addNewAdditionalPicture(phoneId: number, pictureUrl: string) {
    try {
        const response = await axios.post(ADD_NEW_PICTURE + `${phoneId}/pctureUrl/add`, pictureUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getAllAdditionPictures(phoneId: number) {
    try {
        const response = await axios.get(GET_ALL_PICTURES + `${phoneId}/pctureUrl/list`);

        console.log("GET ALL ADDITION PICTURE");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function deleteAdditionalPicture(phoneId: number, pictureUrl: number) {
    try {
        const response = await axios.delete(DELETE_PICTURE + `${phoneId}/pctureUrl/${pictureUrl}`);
        console.log("DELETE ADDITION PICTURE");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}