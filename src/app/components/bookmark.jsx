import React from "react";
const BookMark = ({ status, ...rest }) => {
  return (
    <>
      <button className="btn btn-light" onClick={rest.onToggleBookMark}>
        <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
      </button>
    </>
  );
};

export default BookMark;
