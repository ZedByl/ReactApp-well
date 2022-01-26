import { createAction, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import randomInt from "../utils/randomInt";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken() ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLogginedIn: true,
    dataLoaded: false
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLogginedIn: false,
    dataLoaded: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLogginedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userLogOut: (state) => {
            state.entities = null;
            state.isLogginedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSeccessed: (state, action) => {
            state.entities = state.entities.map((user) => user._id === action.payload._id ? action.payload : user);
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceved, usersRequestFiled, userCreated, authRequestSuccess, authRequestFailed, userUpdateSeccessed, userLogOut } = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const createUserFailed = createAction("users/createUserFailed");

export const logIn = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }));
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequested());
    try {
        const { content } = await usersService.create(payload);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch(createUserFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLogOut());
    history.push("/");
};

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await usersService.update(payload);
        dispatch(userUpdateSeccessed(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
        dispatch(usersRequested());
        try {
            const { content } = await usersService.get();
            dispatch(usersReceved(content));
        } catch (error) {
            dispatch(usersRequestFiled(error.message));
        }
};

export const getCurrentUserData = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === state.users.auth.userId);
    } else {
        return null;
    }
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getUsersList = () => (state) => state.users.entities;

export const getIsLogIn = () => (state) => state.users.isLogginedIn;

export const getDataStatus = () => (state) => state.users.dataLoaded;

export const getCurrentUserId = () => (state) => state.users.auth.userId;

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
