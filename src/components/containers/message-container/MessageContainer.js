import React from 'react';
import ReactDOM from 'react-dom'
import styles from './styles.css';
import Message from "../Message/Message";

const schema = require("schm");
const messageSchema = schema({
    isMine: true,
    text: "Hello, message",
    time: new Date().toLocaleString(),
    isRead: false,
});

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props ? props.messages: [],
        }
    }

    _scrollDown() {
        // TODO: возможно, постоянный поиск элемента сделает приложение менее производительным
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    componentDidUpdate(prevProps) {
        if(this.props.shouldScrollDown) {
            this._scrollDown();
        }
    }

    render() {
        /* BUG: flex при использовании justify-content: flex-end
        ломает скроллинг. Решение: засунуть в еще один контейнер! */
        return (
            <div className={styles.InnerScroll}>
                <div className={styles.MessageContainer}>
                    {this.props.messages.map((element, index) => {
                        console.log('validating message: ', messageSchema.validate(element) ? 'OK': 'BAD!');
                        return <Message
                            isMine={element.isOwn}
                            text={element.text}
                            time={element.time}
                            key={index}
                            isRead={element.isRead}/>;
                    })}
                </div>
            </div>
        );
    }
}

export default MessageContainer;
