import React from 'react';
import styles from './styles.css';

class Message extends React.Component {
    render() {
        return (
            <div className={this.props.isMine ?
                styles.my_messages :
                styles.other_messages}>

                <div className={styles.MessageText}>
                    {this.props.text}
                </div>

                <div className={styles.time_and_status}>
                    <div className={styles.time}>
                        {this.props.time}
                    </div>
                    <div className={styles.status}>
                        <div>{this.props.isRead ? 'Read' : 'Unread'}</div>
                    </div>
                </div>

            </div>
        )
        ;
    }
}

export default Message;
