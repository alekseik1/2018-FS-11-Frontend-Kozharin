import { combineReducers } from "redux";
import {
    FILES_SUBMITTED, GEO_SUBMITTED,
    TEXT_SUBMITTED
} from '../actions/index';

function unfinishedMessages(state, action) {
    switch(action.type) {
        case TEXT_SUBMITTED:
            return state.map((message) => {
                // Для данного чата
                if (message.chatID === action.chatID) {
                    // Записываем текущий текст
                    return {...message, text: action.text};
                }
                return message;
            });
        case FILES_SUBMITTED:
            return state.map((message) => {
                if (message.chatID === action.chatID) {
                    return {...message, files: action.files}
                }
                return message;
            });
        case GEO_SUBMITTED:
            return state.map((message) => {
                if (message.chatID === action.chatID) {
                    return {...message, geo: action.geo}
                }
                return message;
            });
        default:
            return state;
    }
}

function authData(state={userID: 1, token: ''}, action) {
    // TODO: здесь должна быть пафосная авторизация с бекендом. Когда-нибудь я ее сделаю
    switch(action.type) {
        case USER_AUTHORIZED:
            return {userID: action.userID, token: action.token};
        default:
            return state;
    }
}

export default combineReducers({
    unfinishedMessages,
    authData,
});
