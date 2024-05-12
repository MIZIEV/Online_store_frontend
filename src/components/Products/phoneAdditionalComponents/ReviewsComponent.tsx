import React, { useEffect, useState } from "react";
import classes from "./RewievsComponent.module.scss"
import CommentComponent from "./CommentComponent";
import { Comment } from "../../../shared.types";
import { getAllComments } from "../../../utils/CommentsServvice";
import { useParams } from "react-router";

const ReviewsComponent: React.FC = () => {

    const [comments, setComments] = useState<Comment[]>([]);
    const { id } = useParams();

    useEffect(() => {
        getAllComments(id).then((response) => {
            setComments(response);
        })

    }, [])




    return (
        <div className={classes.container}>

            <div className={classes.topBlock}>
                <input
                    type="text"
                    placeholder="Запишіть свій відгук про цей товар"
                />
                <button>Написати відгук</button>
            </div>

            <div className={classes.bottomBlock}>

                {
                    comments.map((comment) => (

                        <CommentComponent key={comment.id} comment={comment} />
                    ))
                }



            </div>

        </div>
    )
}

export default ReviewsComponent;