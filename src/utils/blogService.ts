import axios from "axios";
import { BlogProps } from "../shared.types";
import { HOST } from "./host";

const HOST_PORT = HOST;
const GET_ALL_BLOGS = "http://" + HOST_PORT + "/api/blog/list"
const GET_ONE_BLOG = "http://" + HOST_PORT + "/api/blog/"

export async function getAllBlogs() {
    try {
        const responce = await axios.get(GET_ALL_BLOGS);
        console.log("GET BLOGS FUNC")
        console.log(responce);

        return responce.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getOneBlog(blogId: number) {
    try {
        const response = await axios.get(GET_ONE_BLOG + `${blogId}`);

        console.log("get one blog function - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addNewBlog(blog: BlogProps) {
    try {
        const response = await axios.post(`${GET_ONE_BLOG}add`, blog);
        console.log("add blog function - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function deleteBlog(blogId: number) {
    try {
        const response = await axios.delete(`${GET_ONE_BLOG}${blogId}`);
        console.log("delete blog function - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}