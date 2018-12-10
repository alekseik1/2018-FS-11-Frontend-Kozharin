import React from 'react';
import ChatListItem from './ChatsList/index';
import styles from './styles.css';
import {Redirect} from "react-router-dom";
import { loadChats, chatOpened } from "../../../actions";
import { connect } from 'react-redux';

class ChatsList extends React.Component {

    componentDidMount() {
        this.props.loadChats(this.props.match.params.userID, '');
    }

    /**
     * Преобразует {0: {...}, 1: {...}} в <ChatListItem />
     * @param chats
     * @private
     */
    _generateChatListItems(chats) {
        return Object.keys(chats).map( (key) => {
            let item = this.props.chats[key];
            return (
                <ChatListItem
                    avatarURL={item.avatar}
                    fullName={item.chatName}
                    lastMessagePreview={item.lastMessagePreview}
                    clickCallback={() => this.props.openChat(item.chatID)}
                    chatID={item.chatID}
                    key={key}
                />
            )
        });
    }

    render() {
        if (this.props.currentChat !== -1) {
            console.log('Do redirect'); console.log(this.props);
            // TODO: редиректить на диалог с конкретным пользователем
            return <Redirect to={`/chat${this.props.currentChat}`} />;
        } else {
            return (
                <div className={styles.dialogs_list}>
                    {this._generateChatListItems(this.props.chats)}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        chats: state.loadedChats,
        currentChat: state.currentChat,
    }
};

const mapDispatchToProps = dispatch => ({
    loadChats: (userID, token) => dispatch(loadChats(userID, token)),
    openChat: (chatID) => dispatch(chatOpened(chatID)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);
