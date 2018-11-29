import React, { Component } from 'react';
import styles from './styles.css';
import Input from '../../input/Input';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages} from '../../../utils/backend-utils/index';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: [], shouldScrollDown: true};
        this.serverURL = '/api/';
    }

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        getChatMessages(4, 0, 10e5).then((result) => this.setState({messages: result}));
    }

    _onMessageSubmit(message) {
        let mes = this.state.messages.slice();
        mes.push({
            text: message.text,
            time: new Date(message.time).toLocaleString(),
            isRead: false,
            files: message.files,
            isOwn: true
        });
        this._sendMessage({
            text: message.text,
            time: message.time,
            // TODO: определять автора сообщений
            author: 'Me',
            attach: message.files.length === 0 ? [] : message.files[0],
        });
        this.setState({messages: mes, shouldScrollDown: true});
    }

    _sendMessage (message) {
        console.log(message);
        console.log(JSON.stringify({
            // todo: поменять на нормальные chat_id и user_id
            'chat_id': 4,
            'user_id': 0,
            'content': message.text,
            'added_at': message.time,
        }));
        message.sending = fetch(this.serverURL, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            // TODO: разобраться с CORS и поставить нормальную политику
            mode: 'no-cors',
            body: JSON.stringify({
                'jsonrpc': '2.0',
                'method': 'send_message',
                'id': '1',
                'params': {
                    // todo: поменять на нормальные chat_id и user_id
                    'chat_id': 4,
                    'user_id': 0,
                    'content': message.text,
                    'added_at': message.time,
                },
            }),
        }).then(
            response => {console.log(response); response.json()}
        ).then(
            success => console.log(success)
        );
    }

    /**
     * Вернуть, когда собеседник был последний раз онлайн
     */
    getLastOnline() {
        return 'Был в сети недавно';
    }

    render() {
        return (
            <div className={styles.react_container}>
                <Header
                    prevLink={this.props.prevLink}
                    fullName={this.props.fullName}
                    avatarURL={this.props.avatarURL}
                    lastOnline={this.getLastOnline()}
                />
                <MessageContainer
                    messages={this.state.messages}
                    shouldScrollDown={this.state.shouldScrollDown}
                />
                <Input onSubmit={this._onMessageSubmit.bind(this)} />
            </div>
        );
    }
}

export default Dialog;
