import React from "react";
import { useLocation, useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId } = useParams();
    const { pathname } = useLocation();
    if (userId) {
        return pathname === `/users/${userId}/edit` ? (
            <UserEditPage id={userId} />
        ) : (
            <UserPage id={userId} />
        );
    } else {
        return <UsersListPage />;
    }
};

export default Users;
