import React from "react";
import FormComponent, { TextAreaField } from "../form";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const AddCommentForm = ({ pageId, onSubmit }) => {
    const { currentUser } = useAuth();
    const data = {
        userId: currentUser._id,
        pageId,
        content: ""
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        }
    };

    return (
        <FormComponent
            onSubmit={onSubmit}
            validatorConfig={validatorConfig}
            defaultData={data}
        >
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
