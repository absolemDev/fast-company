import React, { useEffect, useState } from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import { useParams } from "react-router-dom";
import api from "../../api";
import Comment from "../common/comments/comment";

const CommentsSection = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((c) =>
                setComments(c.sort((cA, cB) => cB.created_at - cA.created_at))
            );
    }, []);
    const handleAddComment = (data) => {
        api.comments.add(data).then((comment) => {
            setComments((prevState) => [comment, ...prevState]);
            console.log(comment);
        });
    };
    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments((prevState) =>
                    prevState.filter((comment) => comment._id !== id)
                )
            );
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm
                        pageId={userId}
                        onSubmit={handleAddComment}
                    />
                </div>
            </div>
            {comments.length > 0 ? (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {comments.map((c) => (
                            <Comment
                                id={c._id}
                                userId={c.userId}
                                content={c.content}
                                createdAt={c.created_at}
                                onRemove={handleRemoveComment}
                                key={c._id}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default CommentsSection;
