import React from "react";
import { BlogProps } from "../../shared.types";
import classes from "./BlogCard.module.scss";

const BlogCard: React.FC<BlogProps> = (props) => {

    let slicedText = props.text.slice(0, 80)+"...";

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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 18.6673C17.4728 18.6673 18.6667 17.4734 18.6667 16.0007C18.6667 14.5279 17.4728 13.334 16 13.334C14.5273 13.334 13.3333 14.5279 13.3333 16.0007C13.3333 17.4734 14.5273 18.6673 16 18.6673Z" fill="#12372A" />
                        <path d="M16 25.3327C24 25.3327 29.3333 15.9993 29.3333 15.9993C29.3333 15.9993 24 6.66602 16 6.66602C7.99999 6.66602 2.66666 15.9993 2.66666 15.9993C2.66666 15.9993 7.99999 25.3327 16 25.3327ZM16 10.666C18.9453 10.666 21.3333 13.054 21.3333 15.9993C21.3333 18.9447 18.9453 21.3327 16 21.3327C13.0547 21.3327 10.6667 18.9447 10.6667 15.9993C10.6667 13.054 13.0547 10.666 16 10.666Z" fill="#12372A" />
                    </svg>
                </span>

                <span className={classes.previewText}>{slicedText}</span>
            </div>
        </>
    )
}

export default BlogCard;