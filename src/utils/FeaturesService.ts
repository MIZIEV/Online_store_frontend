import axios from "axios";
import { PhoneFeature } from "../shared.types";
import { HOST } from "./host";

const HOST_PORT = HOST;

const ADD_FEATURE_UEL = "http://" + HOST_PORT + "/api/phone/";

export async function addNewPhoneFeature(phoneFeature: PhoneFeature, phoneId: number) {
    try {
        const response = await axios.post(`${ADD_FEATURE_UEL}${phoneId}/feature/add`, phoneFeature);
        console.log("service function ADD FEATURE - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getAllPhoneFeatures(phoneId: number) {
    try {
        const response = await axios.get(`${ADD_FEATURE_UEL}${phoneId}/feature/list`);
        console.log("service function GET FEATURE LIST- ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteFeature(phoneId: number, featureId: number) {
    try {
        const response = await axios.delete(`${ADD_FEATURE_UEL}${phoneId}/feature/${featureId}`);
        console.log("service function DELETE FEATURE - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}