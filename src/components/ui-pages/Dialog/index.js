import React, { Component } from 'react';
import styles from './styles.css';
import Input from '../../input/Input';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages, sendChatMessage} from '../../../utils/backend-utils/index';

class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {messages: [], shouldScrollDown: true};
        this.serverURL = '/api/';
        this.DEBUG_CHAT_ID = 4;
        this.DEBUG_USER_ID = 0;
        this.DEBUG_LIMIT = 10e5;
    }

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        console.log(this.DEBUG_USER_ID);
        getChatMessages(this.DEBUG_CHAT_ID, this.DEBUG_USER_ID, this.DEBUG_LIMIT)
            .then((result) => {
                console.log('getChatMessages: ');
                console.log(result);
                this.setState({messages: result})
            });
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

        sendChatMessage(this.DEBUG_CHAT_ID, this.DEBUG_USER_ID, message.text).then( () => {
            this.setState({messages: mes, shouldScrollDown: true});
        });
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
