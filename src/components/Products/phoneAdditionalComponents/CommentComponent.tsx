import React from "react";
import classes from "./CommentComponent.module.scss"

const CommentComponent: React.FC = (props) => {

    const comment = props.comment;



    return (
        <div className={classes.container}>
            <div className={classes.topBlock}>
                <span className={classes.author}>{comment.authorName}</span>
                <span className={classes.createdAt}>{comment.createdAt}</span>
            </div>
            <div className={classes.bottomBlock}>{comment.commentText}</div>
        </div>
    )
}

export default CommentComponent;