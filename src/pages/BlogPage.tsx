import React from "react";
import { getAllBlogs } from "../utils/blogService";
import { useQuery } from "@tanstack/react-query";
import { BlogProps } from "../shared.types"
import Blog from "../components/Blog/Blog";

const BlogPage: React.FC = () => {

    const { data, isPending, isError } = useQuery({
        queryKey: ["blog"],
        queryFn: ({ signal }) => getAllBlogs({ signal })
    })

    return (
        <>
            {data && data.length === 0 && <p>No blogs found!</p>}
            <div>
                {data && data.map((item: BlogProps) => {
                    <Blog
                        key={item.id}
                        id={item.id}
                        title={item.title}

                    />

                })}
            </div>
        </>
    )
}

export default BlogPage;