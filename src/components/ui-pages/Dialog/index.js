import React, { Component } from 'react';
import styles from './styles.css';
import InputForm from '../../input/InputForm';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages, sendChatMessage} from '../../../utils/backend-utils/index';
import {chatOpened, loadChatMessages, chatClosed} from "../../../actions";
import { connect } from 'react-redux';
import {isEmptyObject} from "../../../utils/js-checks";

class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {messageLimit: 100};
    }

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        console.log('Dialog props:', this.props);
        this.props.chatOpened(this.props.chatID);
        this.props.loadMessages(this.props.chatID, this.props.myID, this.state.messageLimit);
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

        sendChatMessage(this.props.match.params.chatID, this.props.userID, message.text).then( () => {
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
                    fullName={this.props.chatName}
                    avatarURL={this.props.chatAvatar}
                    lastOnline={this.getLastOnline()}
                    onBack={chatClosed}
                />
                <div />
                <InputForm onSubmit={this._onMessageSubmit.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // Ничего не загружено
    if (isEmptyObject(state.loadedChats)) {
        return {chatName: 'NO DATA', chatAvatar: null, messages: [], myID: -1}
    }
    return {
        chatName: state.loadedChats[state.currentChat].chatName,
            chatAvatar: state.loadedChats[state.currentChat].chatAvatar,
        messages: state.loadedChats[state.currentChat].messages,
        myID: state.userData.userID,
        chatID: state.loadedChats[state.currentChat].chatID,
    }
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
