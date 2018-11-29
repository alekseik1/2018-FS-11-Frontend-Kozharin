import React, { Component } from 'react';
import Dialog from "./components/ui-pages/Dialog";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Input from "./components/input/Input";
import ListDialogs from "./components/ui-pages/DialogsList/index";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Input} />
                <Route exact path='/dialogs' component={ListDialogs} />
                <Route path='/im' render={(props) =>
                    <Dialog {...props}
                            prevLink={'/'}
                            fullName={"Мистер Кот"}
                            avatarURL={'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'}
                    />}
                />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
