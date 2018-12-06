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
