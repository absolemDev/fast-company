import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    ...rest
}) => {
    const handelChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    placeholder={placeholder}
                    id={name}
                    value={value}
                    onChange={handelChange}
                    name={name}
                    className={`form-control${error ? " is-invalid" : ""}`}
                    {...rest}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default React.memo(TextAreaField);
