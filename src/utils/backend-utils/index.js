// TODO: поменять на реальный сервер в продакшне
const BACKEND_URL = '/api/';

/**
 * Загружает диалоги пользователя
 * @param userID id пользователя
 */
function getDialogs(userID) {
    fetch()
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
        return success.result
            .slice()
            // С бека они приходят в обратном порядке (особенность SQL)
            .reverse();
    }).catch(err => console.log(err));
}

export {getChatMessages, getDialogs};
