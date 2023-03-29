import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserEditForm from "../../ui/userEditForm";

const UserEditPage = ({ id }) => {
    const [user, setUser] = useState();
    const [professionsData, setProfessionData] = useState();
    const [qualitiesData, setQualitiesData] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => setProfessionData(data));
        api.qualities.fetchAll().then((data) => setQualitiesData(data));
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user && professionsData && qualitiesData ? (
                        <UserEditForm
                            {...user}
                            professionsData={professionsData}
                            qualitiesData={qualitiesData}
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
