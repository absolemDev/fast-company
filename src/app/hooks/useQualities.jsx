import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
            return content;
        } catch (error) {
            errorCacter(error);
        }
    }
    function getQuality(id) {
        return qualities.find((q) => q._id === id);
    }

    function errorCacter(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
            {!isLoading ? children : "Loading..."}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
