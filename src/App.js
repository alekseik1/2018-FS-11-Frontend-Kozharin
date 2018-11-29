import React, { Component } from 'react';
import Dialog from "./components/ui-pages/Dialog";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Input from "./components/input/Input";
import DialogsList from "./components/ui-pages/DialogsList/index";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: 4,
            chat_id: 0,
            dialogs: [
                {
                    avatarURL: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg',
                    fullName: 'Коте Обжорович',
                    // TODO: получать сообщения с бека и обрезать их
                    lastMessagePreview: 'Знаешь, я люблю вискас. Он очень вкусный, а Борис вообще ' +
                        'говорит, что это главный источник его энергии :)',
                    // TODO: ставить здесь ID с бэка
                    chatID: 4,
                },
                {
                    avatarURL: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg',
                    fullName: 'Мотэ Обжорович',
                    // TODO: получать сообщения с бека и обрезать их
                    lastMessagePreview: 'Ну и что, что я толстый? Ты просто не понимаешь, ' +
                        'что значит искусство тела!',
                    // TODO: ставить здесь ID с бэка
                    chatID: 3,
                }
            ]
        };
    }

    render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Input} />
                <Route exact path='/dialogs' render={(props) => {
                    return (
                        <DialogsList
                            {...props}
                            dialogs={this.state.dialogs}
                            onDialogSelectListener={(chatID, chatName) => {
                                this.setState({
                                    chatID: chatID,
                                    chatName: chatName,
                                })
                            }}
                        />
                    );
                }} />
                <Route exact path='/im' render={(props) =>
                    <Dialog {...props}
                            prevLink={'/dialogs'}
                            // TODO: брать эти значения с бека
                            fullName={this.state.chatName}
                            avatarURL={'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'}
                            chatID={this.state.chatID}
                    />}
                />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
