import qualitiesReducer from "./qualities";
import professionReducer from "./professions";
import usersReducer from "./users";
import commentsReducer from "./comments";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    profession: professionReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
