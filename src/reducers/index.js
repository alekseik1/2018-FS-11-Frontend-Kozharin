import { combineReducers } from "redux";
import {
    CHAT_MESSAGES_LOADED,
    CHATS_LOADED,
    FILES_SUBMITTED, GEO_SUBMITTED, CHAT_OPENED,
    TEXT_SUBMITTED, UPDATE_USER_DATA, CHAT_CLOSED, LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCESS
} from '../actions/index';

function unfinishedMessages(state =
                                {0: {chatID: 0, text: '', geo: {}, files: []}}
                                , action) {
    switch(action.type) {
        case TEXT_SUBMITTED:
            /* Пример массива:
             {2:
                {chatID: 2, text: 'asd', geo: {}, files: []},
              3:
                {chatID: 3, text: 'asd', geo: {}, files: []},
             }
             */
            return state.keys().map((key) => {
                // Для данного чата
                if (key === action.chatID) {
                    // Записываем текущий текст
                    return {[key]: {...state[key], text: action.text}};
                }
                return {[key]: state[key]};
            });
        case FILES_SUBMITTED:
            return state.keys().map((key) => {
                // Для данного чата
                if (key === action.chatID) {
                    // Записываем текущий текст
                    return {[key]: {...state[key], files: action.files}};
                }
                return {[key]: state[key]};
            });
        case GEO_SUBMITTED:
            return state.keys().map((key) => {
                // Для данного чата
                if (key === action.chatID) {
                    // Записываем текущий текст
                    return {[key]: {...state[key], geo: action.geo}};
                }
                return {[key]: state[key]};
            });
        default:
            return state;
    }
}

function userData(state={userID: 1, userName: 'Котик', userNick: 'cat228', avatarURL: '', token: ''},
                  action) {
    switch (action.type) {
        case UPDATE_USER_DATA:
            return action.userData;
        case LOGIN_FAILED:

        default:
            return state;
    }
}

function loadedChats(state={}, action) {
    switch (action.type) {
        case CHATS_LOADED:
            return {
                ...state,
                ...action.chats,
            };
        case CHAT_MESSAGES_LOADED:
            return {
                ...state,
                [action.chatID]:
                    {...state[action.chatID], messages: action.messages}
            };
        default:
            return state;
    }
}

function currentChat(state=-1, action) {
    switch (action.type) {
        case CHAT_OPENED:
            return action.chatID;
        case CHAT_CLOSED:
            return -1;
        default:
            return state;
    }
}

function pendingLogin(state=false, action) {
    switch(action.type) {
        case LOGIN_REQUESTED:
            return true;
        case LOGIN_SUCCESS:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    unfinishedMessages,
    userData,
    pendingLogin,
    loadedChats,
    currentChat,
});
