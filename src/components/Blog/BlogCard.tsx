import React from "react";
import { BlogProps } from "../../shared.types";
import classes from "./BlogCard.module.scss";

const BlogCard: React.FC<BlogProps> = (props) => {

    let slicedText = props.text.slice(0, 80) + "...";

    const formatCreatedAt = (createdAt: string): string => {
        const date = new Date(createdAt);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // Format the date as YYYY-MM-DD
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${formattedDate} ${hours}:${minutes}`;
    }

    return (
        <>
            <div className={classes.card}>
                <img src={props.blogPictureUrl} alt="Blog picture" />

                <span>
                    <h6>Новини</h6>
                    <h6>{formatCreatedAt(props.createdAt)}</h6>
                </span>

                <span>
                    <h3>{props.title}</h3>
                </span>

                <span className={classes.previewText}>{slicedText}</span>
            </div>
        </>
    )
}

export default BlogCard;