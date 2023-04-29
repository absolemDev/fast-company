import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const profession = getProfession(id);
    if (!isLoading) {
        return <p>{profession.name}</p>;
    }
    return "Loading...";
};

Profession.propTypes = {
    id: PropTypes.string.isRequired
};

export default Profession;
