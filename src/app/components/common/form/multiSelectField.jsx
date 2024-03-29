/* eslint-disable indent */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue,
    ...rest
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;
    const handelChange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label>{label}</label>
            <Select
                isMulti
                options={optionsArray}
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handelChange}
                name={name}
                closeMenuOnSelect={false}
                {...rest}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default React.memo(MultiSelectField);
