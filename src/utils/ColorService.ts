import axios from "axios";

const HOST = "localhost:8090";
const GET_ALL_COLORS = "http://" + HOST + "/api/color/list";
const ADD_NEW_COLOR = "http://" + HOST + "/api/color/add";
const DELETE_COLOR = "http://" + HOST + "/api/color/remove";
const PUT_THE_COLOR_IN_PHONE = "http://" + HOST + "/api/phone/";

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

export const addNewColor = async (colorCode: string) => {
    try {
        const response = await axios.post(ADD_NEW_COLOR, colorCode, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(colorCode)
        console.log("add new color func")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteColor = async (colorId: number) => {
    try {
        const response = await axios.delete(DELETE_COLOR + "/" + colorId);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const putTheColorsInPhone = async (phoneId: number, colorsId: number[]) => {
    try {
        const response = await axios.patch(PUT_THE_COLOR_IN_PHONE + `${phoneId}/color`, colorsId);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}