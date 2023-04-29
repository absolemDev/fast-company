import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserEditPage id={userId} />
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
