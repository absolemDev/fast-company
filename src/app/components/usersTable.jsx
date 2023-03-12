import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import { Link } from "react-router-dom";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Проффессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
