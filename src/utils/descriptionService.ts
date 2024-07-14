import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const GET_DESCRIPTIONS = "http://" + HOST_PORT + "/api/phone/";
const ADD_DESCRIPTION = "http://" + HOST_PORT + "/api/phone/";
const DELETE_DESCRIPTION = "http://" + HOST_PORT + "/api/phone/";

interface PhoneDescription {
    id: number,
    descriptionText: string
}


export async function getDescriptions(phoneId: number): Promise<PhoneDescription[]> {
    try {
        const response = await api.get(GET_DESCRIPTIONS + `${phoneId}` + "/description/list");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function addNewDescription(phoneId: number, data: FormData): Promise<any> {
    try {
        const response = await api.post(ADD_DESCRIPTION + `${phoneId}` + "/description/add", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function deleteDescription(phoneId: number, descriptionId: number): Promise<any> {
    try {
        const response = await api.delete(DELETE_DESCRIPTION + `${phoneId}` + "/description/remove/" + `${descriptionId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};