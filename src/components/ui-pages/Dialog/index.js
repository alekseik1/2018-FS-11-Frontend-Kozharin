import React, { Component } from 'react';
import styles from './styles.css';
import Input from '../../input/Input';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages, sendChatMessage} from '../../../utils/backend-utils/index';
import {chatOpened, loadChatMessages, chatClosed} from "../../../actions";
import { connect } from 'react-redux';
import {isEmptyObject} from "../../../utils/js-checks";

class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageLimit: 100,
            chatID: this.props.match.chatID,
            myID: this.props.match.userID
        };
    }

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        console.log('Dialog props:', this.props);
        //this.props.chatOpened(this.state.chatID);
        this.props.loadMessages(this.state.chatID, this.state.myID, this.state.messageLimit);
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

        sendChatMessage(this.state.chatID, this.state.myID, message.text).then( () => {
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
        if (this.state.myID === -1) {
            loadChatMessages()
        }
        return (
            <div className={styles.react_container}>
                <Header
                    fullName={this.state.chatName}
                    avatarURL={''}
                    lastOnline={this.getLastOnline()}
                    onBack={chatClosed}
                />
                <div />
                <Input onSubmit={this._onMessageSubmit.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    loadMessages: (chatID, myID, limit) =>  dispatch(
        loadChatMessages(chatID, myID, limit)
    ),
    sendMessage: (message) => dispatch(),
    chatOpened: (chatID) => dispatch(chatOpened(chatID)),
    chatClosed: () => dispatch(chatClosed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
