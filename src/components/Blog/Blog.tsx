import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneBlog } from "../../utils/blogService";
import classes from "./Blog.module.scss"

const Blog: React.FC = () => {

    const [blog, setBlog] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        getBlog();
    }, [])

    function getBlog() {

        getOneBlog(parseInt(id)).then((response) => {
            console.log(response);
            setBlog(response);

        }).catch((error) => console.error(error));
    }



    return (
        <>

            {
                blog ? (
                    <div className={classes.container}>
                        <h2>{blog.title}</h2>

                        <div className={classes.imageBlock}>
                            <img className={classes.image} src={blog.blogPictureUrl} alt="pict" />
                        </div >
                        <div className={classes.textBlock}>

                            <p>{blog.text}</p>
                        </div>
                    </div >
                ) : (<div>Error</div>)
            }

        </>
    )
}

export default Blog;