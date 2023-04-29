import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getUsersList() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
            return content;
        } catch (error) {
            errorCacter(error);
        }
    }
    function getUser(id) {
        return users.find((u) => u._id === id);
    }
    function errorCacter(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        getUsersList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <UserContext.Provider value={{ users, getUser }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
