import { PhoneFeature } from "../shared.types";
import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const ADD_FEATURE_UEL = "http://" + HOST_PORT + "/api/phone/";

export async function addNewPhoneFeature(phoneFeature: PhoneFeature, phoneId: number) {
    try {
        const response = await api.post(`${ADD_FEATURE_UEL}${phoneId}/feature/add`, phoneFeature);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getAllPhoneFeatures(phoneId: number) {
    try {
        const response = await api.get(`${ADD_FEATURE_UEL}${phoneId}/feature/list`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function deleteFeature(phoneId: number, featureId: number) {
    try {
        const response = await api.delete(`${ADD_FEATURE_UEL}${phoneId}/feature/${featureId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};