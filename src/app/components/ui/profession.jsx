import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionByIds, getProfessionLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionByIds(id));
    const professionLoading = useSelector(getProfessionLoadingStatus());
    if (!professionLoading) {
        return <p>{profession.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
