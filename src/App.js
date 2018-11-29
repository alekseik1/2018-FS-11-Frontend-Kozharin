import React, { Component } from 'react';
import Dialog from "./components/containers/Dialog";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Input from "./components/input/Input";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Input} />
                <Route path='/im' render={(props) => <Dialog {...props} prevLink={'/'} />}/>
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
