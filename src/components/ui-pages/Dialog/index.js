import React, { Component } from 'react';
import styles from './styles.css';
import InputForm from '../../input/InputForm';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages, sendChatMessage} from '../../../utils/backend-utils/index';
import {chatOpened, loadChatMessages, chatClosed, fetchMessages} from "../../../actions";
import { connect } from 'react-redux';
import {isEmptyObject} from "../../../utils/js-checks";
import {messageLimit} from "../../../utils/backend-utils/index";

class Dialog extends Component {

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        // Отправляем action о том, что надо загрузить сообщения
        this.props.loadMessages(this.props.chatID, this.props.token)
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

    render() {
        return (
            <div className={styles.react_container}>
                <Header
                    fullName={this.props.chatName}
                    avatarURL={this.props.chatAvatar}
                    lastOnline={() => 'Недавно'}
                    onBack={chatClosed}
                />
                <div />
                <MessageContainer
                    messages={this.props.messages}
                    ownID={this.props.userID}
                />
                <InputForm
                    onMessageSubmit={this._onMessageSubmit.bind(this)}
                    //onFilesSubmitted={}
                    //onGeoSubmitted={}
                    //onTextChanged={}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // userID должнен быть вписан в store после авторизации
        userID: state.userID,
        chatID: state.currentChat,
        // Токен, полученный с авторизации
        token: state.token,
        // Возьмем сообщения из store, если они там есть
        // Если их нет, то они появятся после действия loadMessages
        messages: state.chatsInfo[state.currentChat] ? state.chatsInfo[state.currentChat].messages : []
    }
};

const mapDispatchToProps = (dispatch) => ({
    loadMessages: (chatID, token) =>  dispatch(fetchMessages(chatID, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
