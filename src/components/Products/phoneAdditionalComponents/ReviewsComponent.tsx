import React, { useEffect, useState } from "react";
import classes from "./RewievsComponent.module.scss"
import CommentComponent from "./CommentComponent";
import { Comment } from "../../../shared.types";
import { addNewComment, deleteComment, getAllComments } from "../../../utils/CommentsServvice";
import { useParams } from "react-router";

const ReviewsComponent: React.FC = () => {

    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState<string>("");

    const { id } = useParams();

    useEffect(() => {
        getAllComments(id).then((response) => {
            setComments(response);
        })
    }, [])

    const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const commentText = formData.get("commentText") as string;
        const comment: Comment = { commentText };

        try {
            await addNewComment(comment, id);
            const updtedComments = await getAllComments(id);

            setComments(updtedComments);
            setCommentText("");

        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(id, commentId);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={classes.container}>

            <div className={classes.topBlock}>
                <form onSubmit={handleNewComment}>
                    <input
                        type="text"
                        value={commentText}
                        name="commentText"
                        onChange={(e) => setCommentText(e.target.value as string)}
                        placeholder="Запишіть свій відгук про цей товар"
                    />
                    <button type="submit">Написати відгук</button>
                </form>
            </div>

            <div className={classes.bottomBlock}>

                {
                    comments.map((comment) => (

                        <CommentComponent
                            id={id}
                            updateComments={() => getAllComments(id)}
                            onDelete={handleDeleteComment}
                            key={comment.id}
                            comment={comment}
                            authorEmail={comment.authorEmail}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ReviewsComponent;