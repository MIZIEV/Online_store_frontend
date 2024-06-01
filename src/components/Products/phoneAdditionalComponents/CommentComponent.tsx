import React from "react";
import classes from "./CommentComponent.module.scss"

const CommentComponent: React.FC = (props) => {

    const authenticatedEmail = sessionStorage.getItem("authenticatedEmail")

    const { id, comment, updateComments, onDelete, authorEmail } = props;

    const handleDeleteComment = async () => {

        try {
            await onDelete(comment.id);
        } catch (error) {
            console.error(error)
        }
    }

    const checkCommentByAutor = () => {

        console.log(" auth " + authorEmail)
        console.log("login " + authenticatedEmail)

        if (authenticatedEmail === authorEmail) {
            return (
                <svg onClick={handleDeleteComment} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" />
                    <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" />
                </svg>
            )
        }

    }

    const formatCreatedAt = (createdAt: string): string => {
        const date = new Date(createdAt);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // Format the date as YYYY-MM-DD
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${formattedDate} ${hours}:${minutes}`;
    }

    return (
        <div className={classes.container}>
            <div className={classes.topBlock}>
                <span className={classes.author}>{comment.authorName}</span>
                <span className={classes.createdAt}>{formatCreatedAt(comment.createdAt)}</span>
            </div>
            <div className={classes.bottomBlock}>
                <div className={classes.comment}>
                    {comment.commentText}

                </div>
                <div className={classes.deleteIcon}>
                    {checkCommentByAutor()}
                </div>
            </div>
        </div>
    )
}

export default CommentComponent;