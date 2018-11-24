import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';
import Input from './components/input/Input';
import MessageContainer from './components/containers/message-container/MessageContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], shouldScrollDown: true};
    this.serverURL = 'http://localhost:5000/api/';
  }

  componentDidMount() {
      this._fill_debug_messages();
  }

  _fill_debug_messages() {
      let mes = [];
      for(let i=0; i<100; i++) {
          mes.push({
              text: 'СЛОЖНА',
              time: new Date().toLocaleDateString(),
              isRead: true,
              files: [],
              isOwn: (i % 2 === 0)
          });
      }
      this.setState({messages: mes});
  }

  _onMessageSubmit(message) {
      let mes = this.state.messages.slice();
      mes.push({
          text: message.text,
          time: message.time,
          isRead: false,
          files: message.files,
          isOwn: true
      });
      this._sendMessage({
          text: message.text,
          time: message.time,
          // TODO: определять автора сообщений
          author: 'Me',
          attach: message.files.length === 0 ? [] : message.files[0],
      });
      this.setState({messages: mes, shouldScrollDown: true});
  }

    _sendMessage (message) {
      console.log(message);
      console.log(JSON.stringify({
          // todo: поменять на нормальные chat_id и user_id
          'chat_id': 4,
          'user_id': 0,
          'content': message.text,
          'added_at': message.time,
      }));
      message.sending = fetch(this.serverURL, {
          method: 'POST',
          headers: {
              'Access-Control-Allow-Origin': '*',
          },
          // TODO: разобраться с CORS и поставить нормальную политику
          mode: 'no-cors',
          body: {
              'jsonrpc': '2.0',
              'method': 'send_message',
              'id': '1',
              'params': JSON.stringify({
                  // todo: поменять на нормальные chat_id и user_id
                  'chat_id': 4,
                  'user_id': 0,
                  'content': message.text,
                  'added_at': message.time,
              }),
          }
      }).then(
          response => {console.log(response); response.json()}
      ).then(
          success => console.log(success)
      );
    }

  render() {
    return (
      <div className={styles.react_container}>
          <MessageContainer
              messages={this.state.messages}
              shouldScrollDown={this.state.shouldScrollDown}
          />
          <Input onSubmit={this._onMessageSubmit.bind(this)} />
      </div>
    );
  }
}

export default App;
