import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const handelChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    placeholder={placeholder}
                    type={showPassword ? "text" : type}
                    id={name}
                    value={value}
                    onChange={handelChange}
                    name={name}
                    className={`form-control${error ? " is-invalid" : ""}`}
                    {...rest}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={`bi bi-eye${
                                showPassword ? "-slash" : ""
                            }`}
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default React.memo(TextField);
