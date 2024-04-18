import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneBlog } from "../../utils/blogService";

const Blog: React.FC = () => {

    const [blog, setBlog] = useState();
    const { id } = useParams();


    useEffect(() => {
        getBlog();
    }, [])

    function getBlog() {

        getOneBlog(id).then((response) => {
            console.log(response);
            setBlog(response);

        }).catch((error) => console.error(error));
    }



    return (
        <>
            <div>
                <img src={blog.blogPictureUrl} />

                <h2>{blog.title}</h2>
                <p>{blog.text}</p>
            </div>

        </>
    )
}

export default Blog;