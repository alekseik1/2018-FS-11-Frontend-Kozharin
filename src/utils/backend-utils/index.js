// TODO: поменять на реальный сервер в продакшне
const BACKEND_URL = 'http://localhost:5000/api/';

let currentID = 0;

const makeJsonrpcRequest = (methodName, params) => {
    currentID++;
    // Вряд ли у нас будет 1000 запросов одновременно
    currentID = Math.floor(currentID / 1000);
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
 */
function getChats(userID, token) {
    return makeJsonrpcRequest('get_user_chats', {'user_id': userID} )
}

function getUserInfo(userID) {
    return makeJsonrpcRequest('get_user_info', {'user_id': userID} );
}


function getChatMessages(chatId, userID, limit) {
    console.log('getChatMessages!');
    let messages = [];
    return makeJsonrpcRequest(
        'get_messages_by_chat',
        {'chat_id': chatId, 'from_id': userID, 'limit': limit}
    ).then(success => {
        // С бека они приходят в обратном порядке (особенность SQL)
        return ( (success.length === 0) ? [] : success.result.slice().reverse() );
    });
}

// TODO: передавать файлы в сообщении
function sendChatMessage(chatId, senderID, messageText) {
    return makeJsonrpcRequest(
        'send_message',
        {'chat_id': chatId, 'user_id': senderID, 'text': messageText}
    );
}

export {getChatMessages, getChats, sendChatMessage, getUserInfo};
