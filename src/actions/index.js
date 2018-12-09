export const messageSubmitted = () => ({
    type: 'MESSAGE_SUBMITTED',
});

export const textSubmitted = (text) => ({
    type: 'TEXT_SUBMITTED',
    text
});

export const filesSubmitted = (files) => ({
    type: 'FILES_SUBMITTED',
    files,
});

// **************************************
/*  TODO: по сути, костыль.
    Запрещает пользователю покидать страницу,
    пока идет загрузка файла/координат
 */
export const beginPendingOperation = () => ({
    type: 'BEGIN_ASYNC',
});

export const endPendingOperation = () => ({
   type: 'END_ASYNC',
});
// **************************************

export const geoSubmitted = (geo) => ({
    type: 'GEO_SUBMITTED',
    geo
});


export const SEND_MESSAGE = (receiver, text, attachment, geo) => ({
    type: 'SEND_MESSAGE',
    text,
    receiver,
    attachment,
    geo
});

export const LOAD_CHATS = (userID) => ({
   type: 'LOAD_CHATS',
   userID
});

export const LOGIN_USER = (userID, token) => ({
    type: 'LOGIN_USER',
    userID,
    // todo: токен пока не используется
    token
});

export const LOAD_MESSAGES = (userID, chatID, limit) => ({
   type: 'LOAD_MESSAGES',
   userID, chatID, limit
});
