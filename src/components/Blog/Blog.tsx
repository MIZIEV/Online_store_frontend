import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneBlog } from "../../utils/blogService";
import classes from "./Blog.module.scss"
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import { BlogProps } from "../../shared.types";

const Blog: React.FC = () => {

    const [blog, setBlog] = useState<BlogProps>();
    const { id } = useParams<string>();

    useEffect(() => {
        getBlog();
    }, [])

    function getBlog() {

        getOneBlog(Number(id)).then((response) => {
            console.log(response);
            setBlog(response);

        }).catch((error) => console.error(error));
    }

    return (
        <>
            {
                blog ? (
                    <div className={classes.container}>
                        <BreadCrumb items={[{ path: "/", title: "Головна/" }, { path: "/blog", title: "блог/" }, { path: `/blog/${blog.id}`, title: `${blog.title}` }]} />
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