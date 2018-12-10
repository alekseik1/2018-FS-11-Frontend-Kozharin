import React from 'react';
import styles from './styles.css';

const ChatListItem = ({chatID, fullName, avatarURL, lastMessagePreview, clickCallback}) => {
    return (
        <div className={styles.container}
             onClick={() => {
                 clickCallback(chatID);
             }}>
            <img
                src={avatarURL}
                className={styles.avatar}
            />
            <div className={styles.dialog_description}>
                <div className={styles.full_name}> {fullName} </div>
                <div className={styles.last_message_preview}> {lastMessagePreview} </div>
            </div>
        </div>
    )
};

export default ChatListItem;
