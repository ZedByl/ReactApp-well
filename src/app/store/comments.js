import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addComment: (state, action) => {
            state.entities.push(action.payload);
        },
        removeComment: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceved, commentsRequestFiled, addComment, removeComment } = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList = (id) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(id);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const addCommentUser = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(addComment(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const removeCommentUser = (id) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(removeComment(id));
        }
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
