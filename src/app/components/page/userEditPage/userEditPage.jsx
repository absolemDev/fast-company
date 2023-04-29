import React from "react";
import PropTypes from "prop-types";
import UserEditForm from "../../ui/userEditForm";
import BackHistoryButton from "../../common/backButton";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfessions";
import { useQuality } from "../../../hooks/useQualities";

const UserEditPage = ({ id }) => {
    const user = useUser().getUser(id);
    const { professions } = useProfession();
    const { qualities } = useQuality();

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user && professions && qualities ? (
                        <UserEditForm
                            {...user}
                            professionsData={professions}
                            qualitiesData={qualities}
                        />
                    ) : (
                        <h3>Loading...</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

UserEditPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserEditPage;
