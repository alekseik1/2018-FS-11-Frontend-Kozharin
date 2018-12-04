export const sendMessage = (receiver, text, attachment) => ({
    type: 'SEND_MESSAGE',
    text,
    receiver,
    attachment,
});

export const loadChats = (userID) => ({
   type: 'LOAD_CHATS',
   userID
});
