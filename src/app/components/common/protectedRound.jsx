import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRound = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        <Route {...rest} render={(props) => {
            if (!currentUser) {
                return <Redirect to={{
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                }} />;
            }
            return Component ? <Component {...props} /> : children;
        }}/>
    );
};

ProtectedRound.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    location: PropTypes.object
};

export default ProtectedRound;
