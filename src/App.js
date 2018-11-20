import React, { Component } from 'react';
import './App.css';
import Input from './components/input/Input';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Input />
        </header>
      </div>
    );
  }
}

export default App;
