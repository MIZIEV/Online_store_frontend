import axios from "axios";

const HOST = "localhost:8090"
const GET_ALL_BLOGS = "http://" + HOST + "/api/blog/list"
const GET_ONE_BLOG = "http://" + HOST + "/api/blog/"

export async function getAllBlogs({
    signal
}:
    {
        signal: any,
    }) {
    let url = GET_ALL_BLOGS;

    console.log(url);

    try {
        const responce = await axios.get(url, { cancelToken: signal.token });
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

        console.log("service function - ")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}