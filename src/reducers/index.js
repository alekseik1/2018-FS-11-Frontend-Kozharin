import { combineReducers } from "redux";
import {
    CHAT_MESSAGES_LOADED,
    CHATS_LOADED,
    CHAT_OPENED,
    UPDATE_USER_DATA,
    CHAT_CLOSED,
    LOGIN_FAILED,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_ERROR, MESSAGE_TEXT_CHANGED, SEND_MESSAGE_REQUEST, SEND_MESSAGE_ERROR,
    EMOJI_SELECTED
} from '../actions/index';
import {SEND_MESSAGE_SUCCESS} from "../actions";

function userData(state={userID: undefined, userName: undefined, userNick: undefined, avatarURL: undefined, token: undefined},
                  action) {
    switch (action.type) {
        case UPDATE_USER_DATA:
            return action.userData;
        case LOGIN_FAILED:
            return {userID: -1, userName: 'Guest', userNick: 'Guest', avatarURL: '', token: '-1'};
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

function chatsInfo(state={0: {isFetching: false, error: -1, messages: [], savedText: ''}}, action) {
    switch(action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {
                [action.chatID]: {
                    ...state[action.chatID],
                    isFetching: true,
                    error: false,
                    // Оставляем те же сообщения, что были получены ранее, при их наличии
                    messages: state[action.chatID] ? [...state[action.chatID].messages] : [],
                }, ...state,
            };
        case FETCH_MESSAGES_ERROR:
            return {
                [action.chatID]: {
                    ...state[action.chatID],
                    isFetching: false,
                    error: action.error,
                }, ...state,
            };
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                [action.chatID]: {
                    ...state[action.chatID],
                    isFetching: false,
                    error: false,
                    // Оставляем те же сообщения, что были получены ранее, при их наличии
                    messages: state[action.chatID] ? [...state[action.chatID].messages, ...action.response] : [],
                },
            };
        case EMOJI_SELECTED:
            return {
                ...state,
                [action.chatID]: {
                    ...state[action.chatID],
                    savedText: ( (state[action.chatID].savedText) === undefined ? "" : state[action.chatID].savedText )
                        + action.emojiHTML,
                }
            };
        case MESSAGE_TEXT_CHANGED:
            return {
                ...state,
                [action.chatID]: {
                    ...state[action.chatID],
                    savedText: action.text,
                },
            };
        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                [action.chatID]: {
                    ...state[action.chatID],
                    isSending: true,
                    errorSending: false,
                },
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                [action.chatID]: {
                    ...state[action.chatID],
                    isSending: false,
                    errorSending: false,
                },
            };
        case SEND_MESSAGE_ERROR:
            return {
                ...state,
                [action.chatID]: {
                    ...state[action.chatID],
                    isSending: false,
                    errorSending: action.error,
                },
            };
        default:
            return state;
    }
}

export default combineReducers({
    userData,
    chatsInfo,
    loadedChats,
    currentChat,
});
