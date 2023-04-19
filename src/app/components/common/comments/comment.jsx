import React, { useEffect, useState } from "react";
import api from "../../../api";
import { dateStamp } from "../../../utils/dateStamp";
import PropTypes from "prop-types";

const Comment = ({ id, userId, content, createdAt, onRemove }) => {
    const [userName, setUserName] = useState();
    useEffect(() => {
        api.users.getById(userId).then((user) => setUserName(user.name));
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    {userName ? (
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                            {userName}
                                            {" - "}
                                            <span className="small">
                                                {dateStamp(
                                                    new Date(Number(createdAt))
                                                )}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h5>Loading...</h5>
                    )}
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Comment;
