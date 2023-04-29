import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <>
            <button className="btn btn-light" onClick={rest.onClick}>
                <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
            </button>
        </>
    );
};

BookMark.defaultProps = {
    status: false
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
