/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import api from "../api";
import UserTable from "./usersTable";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import GroupList from "./groupList";
import _ from "lodash";
import TextField from "./textField";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [search, setSearch] = useState("");
    const pageSize = 8;
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        if (search) setSelectedProf();
    }, [search]);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = ({ target }) => {
        setSearch(target.value.trim());
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const searchUsers = search
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              )
            : filteredUsers;
        const count = searchUsers.length;
        const sortedUsers = _.orderBy(
            searchUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <TextField
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search..."
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default UsersList;
