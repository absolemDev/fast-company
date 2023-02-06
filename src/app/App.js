import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user._id === id) return { ...user, bookmark: !user.bookmark };
        return user;
      })
    );
  };
  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
}

export default App;
