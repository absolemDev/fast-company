import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error, ...rest }) => {
    const handelChange = () => {
        onChange({ name, value: !value });
    };
    return (
        <div className="form-check mb-4">
            <input
                className={`form-check-input${error ? " is-invalid" : ""}`}
                type="checkbox"
                value=""
                id={name}
                onChange={handelChange}
                checked={value}
                {...rest}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
