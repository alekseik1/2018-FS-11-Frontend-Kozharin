import React, { Component } from 'react';
import './App.css';
import Input from './components/input/Input';
import MessageContainer from './components/containers/message-container/MessageContainer';

class App extends Component {
  render() {
    return (
      <div>
          <MessageContainer/>
          <Input />
      </div>
    );
  }
}

export default App;
