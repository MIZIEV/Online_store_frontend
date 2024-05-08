import axios from "axios";

const HOST = "localhost:8090"
const ADD_NEW_PICTURE = "http://" + HOST + "/api/phone/";

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