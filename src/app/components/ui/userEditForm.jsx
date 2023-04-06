import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import api from "../../api";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radionField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

const UserEditForm = ({
    _id,
    name,
    email,
    profession,
    sex,
    qualities,
    professionsData,
    qualitiesData
}) => {
    const [data, setData] = useState({
        name,
        email,
        profession: profession._id,
        sex,
        qualities: qualities.map((quality) => ({
            label: quality.name,
            value: quality._id
        }))
    });

    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    const history = useHistory();

    useEffect(() => {
        validate();
    }, [data]);

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

    const getQualitiesArray = (qualities) => {
        return qualities.map((quality) => {
            let qualityData;
            for (const q in qualitiesData) {
                if (qualitiesData[q]._id === quality.value) {
                    qualityData = qualitiesData[q];
                }
            }
            return qualityData;
        });
    };
    const getProfessionObject = (id) => {
        for (const p in professionsData) {
            const profeessionData = professionsData[p];
            if (professionsData[p]._id === id) return profeessionData;
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handelChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users
            .update(_id, {
                ...data,
                qualities: getQualitiesArray(data.qualities),
                profession: getProfessionObject(data.profession)
            })
            .then(() => {
                history.replace(`/users/${_id}`);
            });
    };

    return (
        <form onSubmit={handelSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handelChange}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handelChange}
                error={errors.email}
            />
            <SelectField
                label="Выберите свою профессию"
                defaultOption="Choose..."
                options={professionsData}
                onChange={handelChange}
                value={data.profession}
                error={errors.profession}
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handelChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualitiesData}
                onChange={handelChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Обновить
            </button>
        </form>
    );
};

UserEditForm.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    sex: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    professionsData: PropTypes.object.isRequired,
    qualitiesData: PropTypes.object.isRequired
};

export default UserEditForm;
