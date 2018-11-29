import React, { Component } from 'react';
import Dialog from "./components/ui-pages/Dialog";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Input from "./components/input/Input";
import DialogsList from "./components/ui-pages/DialogsList/index";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Input} />
                <Route exact path='/dialogs' render={(props) => {
                    return <DialogsList
                        {...props}
                        dialogs={
                            [
                                {
                                    avatarURL: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg',
                                    fullName: 'Коте Обжорович',
                                    // TODO: получать сообщения с бека и обрезать их
                                    lastMessagePreview: 'Знаешь, я люблю вискас. Он очень вкусный, а Борис вообще ' +
                                        'говорит, что это главный источник его энергии :)',
                                    // TODO: ставить здесь ID с бэка
                                    userID: 2,
                                },
                                {
                                    avatarURL: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg',
                                    fullName: 'Мотэ Обжорович',
                                    // TODO: получать сообщения с бека и обрезать их
                                    lastMessagePreview: 'Ну и что, что я толстый? Ты просто не понимаешь, ' +
                                        'что значит искусство тела!',
                                    // TODO: ставить здесь ID с бэка
                                    userID: 3,
                                }
                            ]
                        } />;
                }} />
                <Route path='/im' render={(props) =>
                    <Dialog {...props}
                            prevLink={'/dialogs'}
                            // TODO: брать эти значения с бека
                            fullName={"Мистер Кот"}
                            avatarURL={'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'}
                            userID={2}
                    />}
                />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
