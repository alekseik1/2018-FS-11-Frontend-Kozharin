import React, { Component } from 'react';
import './App.css';
import Input from './components/input/Input';
import MessageContainer from './components/containers/message-container/MessageContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [
        {
            text: 'СЛОЖНА',
            time: new Date().toLocaleDateString(),
            isRead: true,
            files: []
        }
    ]};
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
