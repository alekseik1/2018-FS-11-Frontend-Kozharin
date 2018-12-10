import {BrowserRouter, Route, Switch} from "react-router-dom";
import Auth from "../ui-pages/Auth";
import ChatsList from "../ui-pages/ChatsList";
import Dialog from "../ui-pages/Dialog";
import React from "react";

const Root = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Auth} />
                <Route exact path='/dialogs/id:userID?' render={(props) => {
                    return <ChatsList {...props} />;
                }}
                />
                <Route exact path='/chat:chatID?'
                       render={(props) =>
                           <Dialog {...props}
                               prevLink={'/'}
                           />
                       }
                />
            </Switch>
        </BrowserRouter>
    );
};

const mapStateToProps = state => ({
    openedChat: state.currentChat,

});

export default Root;
