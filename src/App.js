import React, { Component } from 'react';
import Dialog from "./components/ui-pages/Dialog";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Auth from "./components/ui-pages/Auth/index"
import DialogsList from "./components/ui-pages/ChatsList/index";
import ChatsList from "./components/ui-pages/ChatsList";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: 0,
            chat_id: 0,
            dialogs: [
                {
                    avatarURL: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg',
                    fullName: 'Коте Обжорович',
                    // TODO: получать сообщения с бека и обрезать их
                    lastMessagePreview: 'Знаешь, я люблю вискас. Он очень вкусный, а Борис вообще ' +
                        'говорит, что это главный источник его энергии :)',
                    // TODO: ставить здесь ID с бэка
                    chatID: 1,
                },
                {
                    avatarURL: 'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg',
                    fullName: 'Мотэ Обжорович',
                    // TODO: получать сообщения с бека и обрезать их
                    lastMessagePreview: 'Ну и что, что я толстый? Ты просто не понимаешь, ' +
                        'что значит искусство тела!',
                    // TODO: ставить здесь ID с бэка
                    chatID: 2,
                }
            ]
        };
    }

    render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Auth} />
                <Route exact path='/dialogs/id:userID?' render={(props) => {
                    return <ChatsList {...props} />;
                    return (
                        <ChatsList
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
                <Route exact path='/chat:chatID?' render={(props) =>
                    <Dialog {...props}
                            prevLink={'/dialogs'}
                            // TODO: брать эти значения с бека
                            fullName={'123'}
                            avatarURL={'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'}
                    />}
                />
            </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({

});

export default App;
