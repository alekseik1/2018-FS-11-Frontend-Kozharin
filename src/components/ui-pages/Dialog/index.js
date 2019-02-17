import React, { Component } from 'react';
import styles from './styles.css';
import InputForm from '../../input/InputForm';
import MessageContainer from '../../containers/message-container/MessageContainer';
import Header from '../../containers/header';
import {getChatMessages, sendChatMessage} from '../../../utils/backend-utils/index';
import {
    chatOpened,
    loadChatMessages,
    chatClosed,
    fetchMessages,
    messageTextChanged,
    submitMessage
} from "../../../actions";
import { connect } from 'react-redux';
import {isEmptyObject} from "../../../utils/js-checks";
import {messageLimit} from "../../../utils/backend-utils/index";

class Dialog extends Component {

    componentDidMount() {
        // Подргужаем сообщения с бекенда
        // TODO: прикрутить сюда авторизацию
        // Отправляем action о том, что надо загрузить сообщения
        this.props.loadMessages(this.props.chatID, this.props.token);
    }

    /*
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
    */

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
                    onMessageSubmit={ () => {
                        console.log('DEUBGGGGG', this.props.messages);
                        this.props.sendChatMessage(
                            this.props.chatID, this.props.userID, this.props.token,
                            this.props.currentText,
                            [], [],
                            //this.props.messages[this.props.chatID].files,
                            //this.props.messages[this.props.chatID].geo
                        )}
                    }
                    //onFilesSubmitted={}
                    //onGeoSubmitted={}
                    currentText={this.props.currentText}
                    onTextChanged={(event) => this.props.saveMessageText(this.props.chatID, event.target.value)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // userID должнен быть вписан в store после авторизации
        userID: state.userData.userID,
        chatID: state.currentChat,
        // Токен, полученный с авторизации
        token: state.userData.token,
        currentText: state.chatsInfo[state.currentChat] ? state.chatsInfo[state.currentChat].savedText : '',
        //currentFiles: state.chatsInfo[state.currentChat] ? state.chatsInfo[state.currentChat].files : [],
        //currentGeo: state.chatsInfo[state.currentChat] ? state.chatsInfo[state.currentChat].geo : [],
        // Возьмем сообщения из store, если они там есть
        // Если их нет, то они появятся после действия loadMessages
        messages: state.chatsInfo[state.currentChat] ? state.chatsInfo[state.currentChat].messages : []
    }
};

const mapDispatchToProps = (dispatch) => ({
    loadMessages: (chatID, token) =>  dispatch(fetchMessages(chatID, token)),
    saveMessageText: (chatID, text) => dispatch(messageTextChanged(chatID, text)),
    sendChatMessage: (chatID, senderID, token, text, file, geo) => dispatch(
        submitMessage(chatID, senderID, token, text, file, geo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
