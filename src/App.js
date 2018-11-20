import React, { Component } from 'react';
import './App.css';
import Input from './components/input/Input';
import MessageContainer from './components/containers/message-container/MessageContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this._fill_debug_messages();
  }

  _fill_debug_messages() {
      this.state = {messages: [
              {
                  text: 'СЛОЖНА',
                  time: new Date().toLocaleDateString(),
                  isRead: true,
                  files: []
              }
          ]};
      let mes = [];
      for(let i=0; i<100; i++) {
          this.state.messages.push(
              {
                  text: 'СЛОЖНА',
                  time: new Date().toLocaleDateString(),
                  isRead: true,
                  files: []
              }
          );
      }
  }

  render() {
    return (
      <div>
          <MessageContainer messages={this.state.messages}/>
          <Input />
      </div>
    );
  }
}

export default App;
