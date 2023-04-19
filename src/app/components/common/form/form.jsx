import React, { useCallback, useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const FormComponent = ({
    children,
    validatorConfig,
    onSubmit,
    defaultData
}) => {
    const [data, setData] = useState(defaultData || {});
    const [errors, setErrors] = useState({});

    const isValid = Object.keys(errors).length === 0;
    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            const indexField = Array.prototype.indexOf.call(form, event.target);
            form.elements[indexField + 1].focus();
        }
    }, []);

    const handelChange = useCallback(
        (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        },
        [setData]
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate(data);
        if (!isValid) return;
        onSubmit(data);
        setData({ ...defaultData });
    };

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate(data);
        }
    }, [data]);

    const clonedElements = React.Children.map(children, (child) => {
        const childType = typeof child.type;
        let config = {};
        if (childType === "object") {
            if (!child.props.name) {
                throw new Error(
                    "Name property is required for field components",
                    child
                );
            }
            config = {
                ...child.props,
                onChange: handelChange,
                error: errors[child.props.name],
                onKeyDown: handleKeyDown
            };
            if (child.type.type.name === "MultiSelectField") {
                config.defaultValue = data[child.props.name];
            } else {
                config.value = data[child.props.name] || "";
            }
        }
        if (childType === "string") {
            if (child.type === "button" && child.props.type === "submit") {
                if (
                    child.props.type === "submit" ||
                    child.props.type === undefined
                ) {
                    config = { ...child.props, disabled: !isValid };
                }
            }
        }
        return React.cloneElement(child, config);
    });

    return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    validatorConfig: PropTypes.object,
    onSubmit: PropTypes.func,
    defaultData: PropTypes.object
};

export default FormComponent;
