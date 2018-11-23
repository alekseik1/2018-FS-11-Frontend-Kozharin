import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';
import Input from './components/input/Input';
import MessageContainer from './components/containers/message-container/MessageContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], shouldScrollDown: true};
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
      this.setState({messages: mes, shouldScrollDown: true});
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
