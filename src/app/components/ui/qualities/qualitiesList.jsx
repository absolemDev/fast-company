import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ idsQualities }) => {
    return (
        <>
            {idsQualities.map((id) => (
                <Qualitie key={id} id={id} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    idsQualities: PropTypes.array.isRequired
};

export default QualitiesList;
