import React from "react";
import AddCommentForm from "../common/comments/addCommentForm";
import { useParams } from "react-router-dom";
import Comment from "../common/comments/comment";
import { useComments } from "../../hooks/useComments";

const CommentsSection = () => {
    const { userId } = useParams();
    const { comments, createComment, removeComment } = useComments();

    const handleAddComment = (data) => {
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments
        //     .remove(id)
        //     .then((id) =>
        //         setComments((prevState) =>
        //             prevState.filter((comment) => comment._id !== id)
        //         )
        //     );
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
