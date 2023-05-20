import React from "react";
import PropTypes from "prop-types";
import FormComponent, { TextField, SelectField } from "../common/form";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import { useQuality } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";

const UserEditForm = ({
    name,
    email,
    profession,
    sex,
    qualities,
    professionsData,
    qualitiesData,
    ...rest
}) => {
    const { updateUserData } = useAuth();
    const { getQuality } = useQuality();
    const data = {
        name,
        email,
        profession,
        sex,
        qualities: qualities.map((q) => {
            const quality = getQuality(q);
            return { label: quality.name, value: quality._id };
        })
    };

    const history = useHistory();

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Электронная почта обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательно для заполнения"
            },
            isEmail: {
                message: "Введите коректный адрес электронной почты"
            }
        },
        profession: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        }
    };

    // const getQualitiesArray = (qualities) => {
    //     return qualities.map((quality) => {
    //         let qualityData;
    //         for (const q in qualitiesData) {
    //             if (qualitiesData[q]._id === quality.value) {
    //                 qualityData = qualitiesData[q];
    //             }
    //         }
    //         return qualityData;
    //     });
    // };
    // const getProfessionObject = (id) => {
    //     for (const p in professionsData) {
    //         const profeessionData = professionsData[p];
    //         if (professionsData[p]._id === id) return profeessionData;
    //     }
    // };

    const handelSubmit = (data) => {
        updateUserData({
            ...rest,
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });
        history.replace(`/users/${rest._id}`);
        // api.users
        //     .update(_id, {
        //         ...data,
        //         qualities: getQualitiesArray(data.qualities),
        //         profession: getProfessionObject(data.profession)
        //     })
        //     .then(() => {
        //         history.replace(`/users/${_id}`);
        //     });
    };

    return (
        <FormComponent
            onSubmit={handelSubmit}
            validatorConfig={validatorConfig}
            defaultData={data}
        >
            <TextField label="Имя" name="name" autoFocus />
            <TextField label="Электронная почта" name="email" />
            <SelectField
                label="Выберите свою профессию"
                defaultOption="Choose..."
                options={professionsData}
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                ]}
                name="sex"
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualitiesData}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
                Обновить
            </button>
        </FormComponent>
    );
};

UserEditForm.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    professionsData: PropTypes.array.isRequired,
    qualitiesData: PropTypes.array.isRequired
};

export default UserEditForm;
