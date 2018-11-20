import React from 'react';
import styles from './styles.css';
import Message from "../Message/Message";

class MessageContainer extends React.Component {

    render() {
        return (
            <div className={styles.MessageContainer}>
                {this.props.messages.map((element, index) => {
                    return <Message
                        isMine={index % 2 === 0}
                        text={element.text}
                        time={element.time}
                        key={index}
                        isRead={element.isRead}/>;
                })}
            </div>
        );
    }
}

export default MessageContainer;
