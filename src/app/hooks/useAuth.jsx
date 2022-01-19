import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService from "../services/localstorage";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/"
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQpnoQJ1wai4Ep4y2I3FxD1ZACaCXRf-s`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            localStorageService.setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Юзер с таким Email уже существует" };
                    throw errorObject;
                }
            }
        }
    }
    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQpnoQJ1wai4Ep4y2I3FxD1ZACaCXRf-s`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            localStorageService.setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Пользователя с таким Email и пароль не существует" };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { email: "Неверный логин или пароль" };
                    throw errorObject;
                }
                if (message === "USER_DISABLED") {
                    const errorObject = { email: "Позователь заблокирован из-за нарушения правил сообщества" };
                    throw errorObject;
                }
            }
        }
    }
    async function updateUserData(data) {
        const { content } = await userService.update(data);
        setUser(content);
        try {
            const { content } = await userService.update(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(async () => {
        if (localStorageService.getAccessToken()) {
            await getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ signUp, signIn, updateUserData, logOut, currentUser }}>
            {!isLoading ? children : "Loading"}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
