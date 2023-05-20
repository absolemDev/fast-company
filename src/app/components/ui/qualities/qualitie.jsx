import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQualities";

const Qualitie = ({ id }) => {
    const { isLoading, getQuality } = useQuality();
    const { name, color } = getQuality(id);
    if (!isLoading) {
        return (
            <span className={`badge bg-${color} m-1`} key={id}>
                {name}
            </span>
        );
    }
    return "Loading...";
};

Qualitie.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualitie;
