/* eslint-disable indent */
import React, { useState, useEffect, useCallback } from "react";
import { paginate } from "../../../utils/paginate";
import UserTable from "../../ui/usersTable";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import _ from "lodash";
import TextField from "../../common/form/textField";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const { users } = useUser();
    const { currentUser } = useAuth();
    const { professions, isLoading: professionsLoading } = useProfession();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");
    const pageSize = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);

    const handleDelete = (userId) => {
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        if (search !== "") setSearch("");
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = useCallback(
        (target) => {
            setSelectedProf();
            setSearch(target.value);
        },
        [setSelectedProf, setSearch]
    );

    const filterUsers = (data) => {
        const filteredUsers = selectedProf
            ? data.filter((user) => user.profession === selectedProf._id)
            : search
            ? data.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              )
            : data;
        return filteredUsers.filter((user) => user._id !== currentUser._id);
    };

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
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
};

export default React.memo(UsersListPage);
