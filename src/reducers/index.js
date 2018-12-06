import { combineReducers } from "redux";
import {LOAD_CHATS, LOAD_MESSAGES, LOGIN_USER, SEND_MESSAGE} from '../actions/index';
import {getChatMessages, getChats, getDialogs, sendChatMessage} from "../utils/backend-utils";

function loadChats(state, action) {
    switch (action.type) {
        case LOAD_CHATS:
            getDialogs(action.userID);
            return state;
        default:
            return state;
    }
}

function loadMessages(state, action) {
    switch(action.type) {
        case LOAD_MESSAGES:
            getChatMessages(action.chatID, action.userID, action.limit);
            return state;
        default:
            return state;
    }
}

// TODO: не используется. Здесь будет авторизация/запрос на авторизацию/пока не придумал.
function loginUser(state, action) {
    return state;
}

function sendMessage(state, action) {
    switch(action.type) {
        case SEND_MESSAGE:
            sendChatMessage(action.chatID, state.userID,
                action.text, action.attachment);
            return state;
        default:
            return state;
    }
}


export default combineReducers({
    loadChats,
    loadMessages,
    loginUser
});
