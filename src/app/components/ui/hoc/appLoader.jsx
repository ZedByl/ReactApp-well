import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLogIn());
    const usersStatus = useSelector(getUsersLoadingStatus);
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionList());
        if (isLoggedIn) dispatch(loadUsersList());
    }, [isLoggedIn]);

    if (!usersStatus) return "loading";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
