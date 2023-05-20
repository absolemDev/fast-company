import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import CommentsSection from "../../ui/commentsSection";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ id }) => {
    const { getUserById } = useUser();
    const user = getUserById(id);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard idsQualities={user.qualities} />
                        <MeetingsCard count={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <CommentsSection />
                        </CommentsProvider>
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
