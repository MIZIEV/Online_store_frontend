import axios from "axios";
import { Comment } from "../shared.types";

const HOST = "13.60.76.209:8080"
const GET_ALL_COMMENTS_URL = "http://" + HOST + "/api/phone/";
const ADD_NEW_COMMENT_URL = "http://" + HOST + "/api/phone/";
const DELETE_COMMENT_URL = "http://" + HOST + "/api/phone/";

export const addNewComment = async (comment: Comment, phoneId: number) => {
    try {
        const response = await axios.post(ADD_NEW_COMMENT_URL + `${phoneId}/comment/add`, comment);
        console.log("ADD NEW COMMENT function");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllComments = async (phoneId: number) => {

    try {
        const response = await axios.get(GET_ALL_COMMENTS_URL + `${phoneId}/comment/list`);
        console.log("GET ALL COMMENTS function");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteComment = async (phoneId: number, commentId: number) => {
    try {
        const response = await axios.delete(DELETE_COMMENT_URL + `${phoneId}/comment/remove/${commentId}`);
        console.log("DELETE COMMENTS function");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}