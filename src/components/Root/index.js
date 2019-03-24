import {BrowserRouter, Route, Switch} from "react-router-dom";
import AuthPage from "../ui-pages/AuthPage";
import ChatsList from "../ui-pages/ChatsList";
import Dialog from "../ui-pages/Dialog";
import React from "react";
import { connect } from 'react-redux';

const Root = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={AuthPage} />
                <Route exact path='/chats/id:userID?' render={(props) => {
                    return <ChatsList {...props} />;
                }}
                />
                <Route exact path='/chat:chatID'
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

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
