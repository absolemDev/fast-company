import React, { useEffect, useState } from "react";
import FormComponent, { SelectField, TextAreaField } from "../form";
import api from "../../../api";
import PropTypes from "prop-types";

const AddCommentForm = ({ pageId, onSubmit }) => {
    const data = {
        userId: "",
        pageId,
        content: ""
    };
    const [allUsers, setAllUsers] = useState();
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    };
    useEffect(() => {
        api.users
            .fetchAll()
            .then((data) =>
                setAllUsers(
                    data.map((user) => ({ value: user._id, name: user.name }))
                )
            );
    });

    return (
        <FormComponent
            onSubmit={onSubmit}
            validatorConfig={validatorConfig}
            defaultData={data}
        >
            <SelectField
                defaultOption="Выберите пользователя"
                options={allUsers}
                name="userId"
            />
            <TextAreaField label="Сообщение" name="content" />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
                Опубликовать
            </button>
        </FormComponent>
    );
};

AddCommentForm.propTypes = {
    pageId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;
