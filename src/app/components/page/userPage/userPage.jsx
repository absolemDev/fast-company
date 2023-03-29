import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <div>completedMeetings: {user.completedMeetings}</div>
                <h2>Rate: {user.rate}</h2>
                <Link className="btn btn-primary" to={`/users/${id}/edit`}>
                    Изменить
                </Link>
            </>
        );
    }
    return <h1>Loading...</h1>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
