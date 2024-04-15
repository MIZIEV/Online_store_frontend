import React from "react";
import { BlogProps } from "../../shared.types";
import classes from "./BlogCard.module.scss";

const BlogCard: React.FC<BlogProps> = (props) => {

    return (
        <>
            <div className={classes.card}>
                <img src={props.blogPictureUrl} alt="Blog picture" />
                <h3>{props.title}</h3>
                <button>More info</button>
            </div>
        </>
    )
}

export default BlogCard;