import {getUserInfo, getChats, getChatMessages, messageLimit} from '../utils/backend-utils'

export const MESSAGE_SUBMITTED = 'MESSAGE_SUBMITTED';
export const messageSubmitted = (chatID) => ({
    type: MESSAGE_SUBMITTED,
    chatID
});

export const TEXT_SUBMITTED = 'TEXT_SUBMITTED';
export const textSubmitted = (text, chatID) => ({
    type: TEXT_SUBMITTED,
    text,
    chatID,
});

export const FILES_SUBMITTED = 'FILES_SUBMITTED';
export const filesSubmitted = (files, chatID) => ({
    type: FILES_SUBMITTED,
    files,
    chatID,
});

// **************************************
/*  TODO: по сути, костыль.
    Запрещает пользователю покидать страницу,
    пока идет загрузка файла/координат
 */
export const BEGIN_PENDING_OPERATION = 'BEGIN_PENDING_OPERATION';
export const beginPendingOperation = (chatID) => ({
    type: BEGIN_PENDING_OPERATION,
    chatID,
});

export const END_PENDING_OPERATION = 'END_PENDING_OPERATION';
export const endPendingOperation = (chatID) => ({
   type: END_PENDING_OPERATION,
    chatID,
});
// **************************************

export const GEO_SUBMITTED = 'GEO_SUBMITTED';
export const geoSubmitted = (geo, chatID) => ({
    type: GEO_SUBMITTED,
    geo,
    chatID,
});

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const updateUserData = (userData) => ({
    type: UPDATE_USER_DATA,
    userData,
});

export const CHATS_LOADED = 'CHATS_LOADED';
export const chatsLoaded = (chats) => ({
    type: CHATS_LOADED,
    chats,
});

/**
 * Получает список чатов, но не сами сообщения чатов!
 * @type {string}
 */
export const LOAD_CHATS = 'LOAD_CHATS';
export function loadChats(userID, token, limit=100) {
    return function(dispatch) {
        getChats(userID, token, limit).then(chats => {
            chats = chats.result;
            // NOTE: здесь преобразуем от структуры бека к структуре фронта
            chats = chats.map(item => {
                return { chatID: item.chat_id, chatName: item.topic, avatar: item.avatar,
                    isGroup: item.is_group_chat === 0, lastReadID: item.last_read_message_id,
                    newMessages: item.new_messages,
                    messages: []
                }
            });
            dispatch(chatsLoaded(chats));
        });
    }
}

export const CHAT_OPENED = 'CHAT_OPENED';
export const chatOpened = (chatID) => ({
    type: CHAT_OPENED,
    chatID: chatID,
});

export const LOAD_CHAT_MESSAGES = 'LOAD_CHAT_MESSAGES';
// TODO: добавить потом сюда авторизацию
export const loadChatMessages = (chatID, userID, limit) => {
    return function(dispatch) {
        getChatMessages(chatID, userID, limit).then( messages =>
            dispatch(chatMessagesLoaded(chatID, messages))
        )
    }
};

export const CHAT_MESSAGES_LOADED = 'CHAT_MESSAGES_LOADED';
export const chatMessagesLoaded = (chatID, messages) => ({
    type: CHAT_MESSAGES_LOADED,
    chatID,
    messages
});

export const CHAT_CLOSED = 'CHAT_CLOSED';
export const chatClosed = () => ({
    type: CHAT_CLOSED,
});

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = () => ({
    type: LOGIN_REQUESTED,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload: payload,
});

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    error: error,
});


export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const fetchMessagesRequest = (chatID) => ({
    type: FETCH_MESSAGES_REQUEST,
    chatID: chatID,
});

export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const fetchMessagesSuccess = (chatID, response) => ({
    type: FETCH_MESSAGES_SUCCESS,
    chatID: chatID,
    response: response,
});

export const FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR';
export const fetchMessagesError = (chatID, error) => ({
    type: FETCH_MESSAGES_ERROR,
    chatID: chatID,
    error: error
});

export function fetchMessages(chatID, token) {
    return function(dispatch) {
        // Говорим, что был запрос на загрузку чата
        dispatch(fetchMessagesRequest(chatID));
        return getChatMessages(chatID).then(
            result => dispatch(fetchMessagesSuccess(chatID, result)),
            error => dispatch(fetchMessagesError(chatID, error))
        );
    }
}