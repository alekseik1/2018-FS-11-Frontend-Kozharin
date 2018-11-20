import React from 'react';
import styles from './styles.css';
import Message from "../Message/Message";

class MessageContainer extends React.Component {

    render() {
        return (
            <div className={styles.MessageContainer}>
                {this.props.messages.map((element, index) => {
                    return <Message
                        text={element.text}
                        time={element.time}
                        isRead={element.isRead}/>;
                })}
            </div>
        );
    }
}

export default MessageContainer;
