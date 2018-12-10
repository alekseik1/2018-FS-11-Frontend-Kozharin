import {getUserInfo, getChats, getChatMessages} from '../utils/backend-utils'

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

export const USER_AUTHORIZED = 'USER_AUTHORIZED';
export function userAuthorized(userID, token) {
    return function(dispatch) {
        getUserInfo(userID).then( userData => {
            userData = userData.result[0];
            dispatch(updateUserData(
                // TODO: здесь я пишу ключи с бекенда
                {
                    userID: userData.user_id,
                    userName: userData.name,
                    userNick: userData.nick,
                    avatarURL: userData.avatar,
                    token: token,
                }
                )
            );
        });
    }
}

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

export const LOAD_CHATS = 'LOAD_CHATS';
export function loadChats(userID, token) {
    return function(dispatch) {
        getChats(userID, token).then(chats => {
            chats = chats.result;
            // NOTE: здесь преобразуем от структуры бека к структуре фронта
            chats = chats.map(item => {
                return { chatID: item.chat_id, chatName: item.topic, avatar: item.avatar,
                    isGroup: item.is_group_chat === 0, lastReadID: item.last_read_message_id,
                    newMessages: item.new_messages, messages: [] }
            });
            dispatch(chatsLoaded(chats));
        });
    }
}

export const CHAT_OPENED = 'CHAT_OPENED';
export const chatOpened = (chatID) => ({
    type: CHAT_OPENED,
    chatID,
});

export const LOAD_CHAT_MESSAGES = 'LOAD_CHAT_MESSAGES';
// TODO: добавить потом сюда авторизацию
export const loadChatMessages = (chatID, userID, limit) => {
    return function(dispatch) {
        getChatMessages(chatID, userID, limit).then( messages =>
            dispatch(chatMessagesLoaded(messages))
        )
    }
};

export const CHAT_MESSAGES_LOADED = 'CHAT_MESSAGES_LOADED';
export const chatMessagesLoaded = (messages) => ({
    type: CHAT_MESSAGES_LOADED,
    messages
});

export const CHAT_CLOSED = 'CHAT_CLOSED';
export const chatClosed = () => ({
    type: CHAT_CLOSED,
});
