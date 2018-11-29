import React, { Component } from 'react';
import Dialog from "./components/containers/Dialog";
import {BrowserRouter, Route, Link} from 'react-router-dom';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <Route path='/im' component={Dialog}/>
        </BrowserRouter>
    );
  }
}

export default App;
