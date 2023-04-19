import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsSection from "../../ui/commentsSection";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard count={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsSection />
                    </div>
                </div>
            </div>
        );
    }
    return <h1>Loading...</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
