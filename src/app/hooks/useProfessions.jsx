import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
            return content;
        } catch (error) {
            errorCacter(error);
        }
    }
    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    function errorCacter(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        getProfessionsList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <ProfessionContext.Provider
            value={{ professions, isLoading, getProfession }}
        >
            {!isLoading ? children : "Loading..."}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
