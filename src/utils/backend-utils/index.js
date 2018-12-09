// TODO: поменять на реальный сервер в продакшне
const BACKEND_URL = 'http://localhost:5000/api/';

/**
 * Загружает диалоги пользователя
 * @param userID id пользователя
 */
function getDialogs(userID) {
    fetch()
}

function getUserInfo(userID) {
    return fetch(BACKEND_URL, {
        method: 'POST',
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'id': '10',
            'method': 'get_user_info',
            'params': {
                'user_id': userID,
            }
        }),
    }).then(response => response.json());
}


function getChatMessages(chatId, userID, limit) {
    console.log('getChatMessages!');
    let messages = [];
    return fetch(BACKEND_URL, {
        method: 'POST',
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'id': '2',
            'method': 'get_messages_by_chat',
            'params': {
                'chat_id': chatId,
                'from_id': userID,
                'limit': limit,
            }
        })
    }).then(response => response.json()
    ).then(success => {
        console.log('Success in getChatMessages: ');
        console.log(success);
        if (success.length === 0) {
            // Если не пришло сообщений, возвращаем пустой список
            return [];
        }
        return success.result
            .slice()
            // С бека они приходят в обратном порядке (особенность SQL)
            .reverse();
    }).catch(err => console.log(err));
}

// TODO: передавать файлы в сообщении
function sendChatMessage(chatId, senderID, messageText) {
    return fetch(BACKEND_URL, {
        method: 'POST',
        body: JSON.stringify({
            'jsonrpc': '2.0',
            'id': '3',
            'method': 'send_message',
            'params': {
                'chat_id': chatId,
                'user_id': senderID,
                'text': messageText,
            }
        })
    });
}

export {getChatMessages, getDialogs, sendChatMessage, getUserInfo};
