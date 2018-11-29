import React from 'react';
import styles from './styles.css';

class DialogListItem extends React.Component{

    render() {
        return (
            <div className={styles.container} onClick={this.props.clickCallback(this.props.userID)}>
                <img
                    src={this.props.avatarURL}
                    className={styles.avatar}
                />
                <div className={styles.dialog_description}>
                    <div className={styles.full_name}> {this.props.fullName} </div>
                    <div className={styles.last_message_preview}> {this.props.lastMessagePreview} </div>
                </div>
            </div>
        )
    }
}

export default DialogListItem;
