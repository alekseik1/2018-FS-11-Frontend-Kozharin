// TODO: поменять на реальный сервер в продакшне
const BACKEND_URL = 'http://localhost:5000/api/';

let currentID = 10;
// Какая пачка сообщений будет грузиться
export const messageLimit = 50;

const makeJsonrpcRequest = (methodName, params) => {
    currentID++;
    // Вряд ли у нас будет 1000 запросов одновременно
    currentID = currentID % 1000;
    return fetch(BACKEND_URL, {
        method: 'POST',
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'id': currentID,
            'method': methodName,
            'params': params
        })
    }).then(response => response.json());
};

/**
 * Загружает диалоги пользователя
 * @param userID id пользователя
 * @param token токен пользователя
 * @param limit максимальное количество диалогов
 */
function getChats(userID, token, limit=100) {
    return makeJsonrpcRequest('get_user_chats', {'user_id': userID, 'limit': limit} )
}


function getChatMessages(chatId, token) {
    return makeJsonrpcRequest(
        'get_messages_by_chat',
        {'chat_id': chatId, 'limit': messageLimit, 'token': token}
    ).then(success => (success.length === 0) ? [] : success.result.slice() );
}

// TODO: передавать файлы в сообщении
function sendChatMessage(chatId, senderID, token, messageText, file, geo) {
    return makeJsonrpcRequest(
        'send_message',
        {
            'chat_id': chatId,
            'sender_id': senderID,
            'token': token,
            'text': messageText,
            'files': file, 'geo': geo,
        }
    );
}

export {getChatMessages, getChats, sendChatMessage};
