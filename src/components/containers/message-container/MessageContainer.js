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
                        console.log('validating message: ', element, ' || ', messageSchema.validate(element) ? 'OK': 'BAD!');
                        return <Message
                            // Тут немного синтаксис меняется
                            isMine={element.userID === this.props.ownID}
                            text={element.content}
                            time={element.added_at}
                            key={index}
                            // TODO: брать с бэкенда, прочитано ли сообщение
                            isRead={false}/>;
                    })}
                </div>
            </div>
        );
    }
}

export default MessageContainer;
