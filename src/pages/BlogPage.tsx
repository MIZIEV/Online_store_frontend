import React from "react";
import { getAllBlogs } from "../utils/blogService";
import { useQuery } from "@tanstack/react-query";
import { BlogProps } from "../shared.types"
import BlogCard from "../components/Blog/BlogCard";

import classes from "./BlogPage.module.scss"
import { NavLink } from "react-router-dom";

const BlogPage: React.FC = () => {

    const { data, isPending, isError } = useQuery({
        queryKey: ["blog"],
        queryFn: ({ signal }) => getAllBlogs({ signal })
    })

    const blogUrl = "/blog/"

    return (
        <>
            <div className={classes.container}>
                <h1>Блог</h1>
                {data && data.length === 0 && <p>No blogs found!</p>}
                <div className={classes.cardList}>
                    {
                        data && data.map((item: BlogProps) => (
                            <NavLink className={classes.link} to={blogUrl + item.id}>
                                <BlogCard
                                    key={item.id}
                                    id={item.id}
                                    blogPictureUrl={item.blogPictureUrl}
                                    title={item.title}
                                    text={item.text}
                                />
                            </NavLink>

                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default BlogPage;