import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
const User = ({ user, ...rest }) => {
  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((q) => (
            <Qualitie key={q._id} {...q} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{`${user.rate}/5`}</td>
        <td>
          <BookMark
            status={user.bookmark}
            onToggleBookMark={() => rest.onToggleBookMark(user._id)}
          />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => rest.onDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
