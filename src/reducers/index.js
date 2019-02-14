import { combineReducers } from "redux";
import {
    CHAT_MESSAGES_LOADED,
    CHATS_LOADED,
    FILES_SUBMITTED,
    GEO_SUBMITTED,
    CHAT_OPENED,
    TEXT_SUBMITTED,
    UPDATE_USER_DATA,
    CHAT_CLOSED,
    LOGIN_FAILED,
    LOGIN_REQUESTED,
    LOGIN_SUCCESS,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_ERROR
} from '../actions/index';
import {isPending} from "q";

function unfinishedMessages(state =
                                [{chatID: 0, text: '', geo: {}, files: []}]
                                , action) {
    switch(action.type) {
        case TEXT_SUBMITTED:
            /* Пример массива:
             [
                {chatID: 2, text: 'asd', geo: {}, files: []},
                {chatID: 3, text: 'asd', geo: {}, files: []},
             ]
             */
            return state.map((key) => {
                // Для данного чата
                if (key.chatID === action.chatID) {
                    // Записываем текущий текст
                    return {
                        ...state.find((element, index, array) => {return element.chatID == action.chatID}),
                        text: action.text
                    };
                }
                return state.find((element, index, array) => {return element.chatID == action.chatID});
            });
        case FILES_SUBMITTED:
            return state.map((key) => {
                // Для данного чата
                if (key.chatID === action.chatID) {
                    // Записываем текущий текст
                    return {
                        ...state.find((element, index, array) => {return element.chatID == action.chatID}),
                        files: action.files
                    };
                }
                return state.find((element, index, array) => {return element.chatID == action.chatID});
            });
        case GEO_SUBMITTED:
            return state.map((key) => {
                // Для данного чата
                if (key.chatID === action.chatID) {
                    // Записываем текущий текст
                    return {
                        ...state.find((element, index, array) => {return element.chatID == action.chatID}),
                        geo: action.geo
                    };
                }
                return state.find((element, index, array) => {return element.chatID == action.chatID});
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
            // BUG: Иногда вызывается CHAT_OPENED с undefined. Пока будет доп.проверка
            if (!action.chatID) return state;
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

function chatsInfo(state={0: {isPending: false, error: -1, messages: []}}, action) {
    switch(action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {
                [action.chatID]: {
                    isPending: true,
                    error: false,
                    // Оставляем те же сообщения, что были получены ранее, при их наличии
                    messages: state[action.chatID] ? [...state[action.chatID].messages] : []
                },
            };
        case FETCH_MESSAGES_ERROR:
            return {
                [action.chatID]: {
                    isPending: false,
                    error: action.error,
                    // Оставляем те же сообщения, что были получены ранее, при их наличии
                    messages: state[action.chatID] ? [...state[action.chatID].messages] : []
                }, ...state,
            };
        case FETCH_MESSAGES_SUCCESS:
            return {
                [action.chatID]: {
                    isPending: false,
                    error: false,
                    // Оставляем те же сообщения, что были получены ранее, при их наличии
                    messages: state[action.chatID] ? [...state[action.chatID].messages, ...action.response] : []
                },
            };
        default:
            return state;
    }
}

export default combineReducers({
    unfinishedMessages,
    userData,
    pendingLogin,
    chatsInfo,
    loadedChats,
    currentChat,
});
