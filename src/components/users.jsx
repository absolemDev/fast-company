import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevSate) => prevSate.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    if (!number) {
      return "Никто с тобой не тусанет";
    }
    if (
      [11, 12, 13, 14, 15, 16, 17, 18, 19].includes(number % 100) ||
      [0, 5, 6, 7, 8, 9].includes(number % 10)
    ) {
      return `${number} человек тусанет стобой сегодня`;
    }
    if ([2, 3, 4].includes(number % 10)) {
      return `${number} человека тусанут стобой сегодня`;
    }
    if (number % 10 === 1) {
      return `${number} человек тусанет стобой сегодня`;
    }
  };
  return (
    <>
      <h2>
        <span
          className={`badge bg-${users.length === 0 ? "danger" : "primary"}`}
        >
          {renderPhrase(users.length)}
        </span>
      </h2>
      {Boolean(users.length) && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Проффессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((q) => (
                    <span className={`badge bg-${q.color} m-1`} key={q._id}>
                      {q.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate}/5`}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
