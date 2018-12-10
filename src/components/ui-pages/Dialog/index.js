import React, { Component } from 'react';
import styles from './styles.css';
import Input from '../../input/Input';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages, sendChatMessage} from '../../../utils/backend-utils/index';
import {chatOpened, loadChatMessages, chatClosed} from "../../../actions";
import { connect } from 'react-redux';

class Dialog extends Component {

    constructor(props) {
        super(props);
        this.state = {messageLimit: 100};
        this.chatID = this.props.chatID;
    }

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        chatOpened(this.chatID);
        loadChatMessages(this.chatID, this.myID, this.state.messageLimit);
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
        console.log(this.props);
        return (
            <div className={styles.react_container}>
                <Header
                    fullName={this.props.chatName}
                    avatarURL={this.props.chatAvatar}
                    lastOnline={this.getLastOnline()}
                    onBack={chatClosed}
                />
                <div />
                <Input onSubmit={this._onMessageSubmit.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    chatName: state.loadedChats[state.currentChat],
    chatAvatar: state.loadedChats,
    messages: state,
    myID: state.authData.userID,
});

const mapDispatchToProps = (dispatch) => ({
    loadMessages: () =>  dispatch(
        loadChatMessages(this.chatID, this.props.myID, this.state.messageLimit)
    ),
    sendMessage: (message) => dispatch(),
    chatOpened: (chatID) => dispatch(chatOpened(chatID)),
    chatClosed: () => dispatch(chatClosed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
