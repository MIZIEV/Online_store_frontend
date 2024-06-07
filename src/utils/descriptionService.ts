import axios from "axios";

const HOST = "13.60.76.209:8080";
const GET_DESCRIPTIONS = "http://" + HOST + "/api/phone/";
const ADD_DESCRIPTION = "http://" + HOST + "/api/phone/";
const DELETE_DESCRIPTION = "http://" + HOST + "/api/phone/";

interface PhoneDescription {
    id: number,
    descriptionText: string
}


export async function getDescriptions(phoneId: number): Promise<PhoneDescription[]> {
    try {
        const response = await axios.get(GET_DESCRIPTIONS + `${phoneId}` + "/description/list");

        console.log("service function GET ALL DESCRIPTION - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function addNewDescription(phoneId: number, data: FormData): Promise<any> {
    try {
        const response = await axios.post(ADD_DESCRIPTION + `${phoneId}` + "/description/add", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("service function ADD NEW DESCRIPTION- ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function deleteDescription(phoneId: number, descriptionId: number): Promise<any> {
    try {
        const response = await axios.delete(DELETE_DESCRIPTION + `${phoneId}` + "/description/remove/" + `${descriptionId}`);
        console.log("service function DELETE DESCRIPTION - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}