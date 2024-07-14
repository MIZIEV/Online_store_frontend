import { Comment } from "../shared.types";
import { HOST } from "./host";
import api from "./api";

const HOST_PORT = HOST;
const GET_ALL_COMMENTS_URL = "http://" + HOST_PORT + "/api/phone/";
const ADD_NEW_COMMENT_URL = "http://" + HOST_PORT + "/api/phone/";
const DELETE_COMMENT_URL = "http://" + HOST_PORT + "/api/phone/";

export const addNewComment = async (comment: Comment, phoneId: number) => {
    try {
        const response = await api.post(ADD_NEW_COMMENT_URL + `${phoneId}/comment/add`, comment);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllComments = async (phoneId: number) => {

    try {
        const response = await api.get(GET_ALL_COMMENTS_URL + `${phoneId}/comment/list`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteComment = async (phoneId: number, commentId: number) => {
    try {
        const response = await api.delete(DELETE_COMMENT_URL + `${phoneId}/comment/remove/${commentId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};