import React from "react";
import { getAllBlogs } from "../utils/blogService";
import { useQuery } from "@tanstack/react-query";
import { BlogProps } from "../shared.types"
import BlogCard from "../components/Blog/BlogCard";

import classes from "./BlogPage.module.scss"

const BlogPage: React.FC = () => {

    const { data, isPending, isError } = useQuery({
        queryKey: ["blog"],
        queryFn: ({ signal }) => getAllBlogs({ signal })
    })

    return (
        <>
            <div className={classes.container}>
                <h1>Блог</h1>
                {data && data.length === 0 && <p>No blogs found!</p>}
                <div className={classes.cardList}>

                    {
                        data && data.map((item: BlogProps) => (
                            <BlogCard
                                key={item.id}
                                id={item.id}
                                blogPictureUrl={item.blogPictureUrl}
                                title={item.title}
                                text={item.text}
                            />

                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default BlogPage;