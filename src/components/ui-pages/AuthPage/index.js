import React from 'react';
import {Redirect} from "react-router-dom";
import { dispatch } from 'react-redux'
import { connect } from 'react-redux';
import styles from './styles.css';
import {
    LOGIN_FAILED,
    LOGIN_REQUESTED,
    loginFailed,
    loginRequested,
    loginSuccess,
    updateUserData
} from "../../../actions";

const DEBUG_USER_ID = 2;
const IS_DEBUG = true;

const AuthPage = ({ userID, handleLogin, loginDEBUG }) => {
    loginDEBUG();
    userID = DEBUG_USER_ID;
    if(userID === undefined && !IS_DEBUG) { // Не авторизован
        return (
            <button onClick={handleLogin}>VK</button>
        )
    } else {
        return (<Redirect to={'/chats/id' + userID}/>)
    }
};

const mapStateToProps = (state={}) => ({
    isAuthorized: state.token,
});

const mapDispatchToProps = dispatch => ({
    handleLogin: () => {
        dispatch(loginRequested());

        //eslint-disable-next-line no-undef
        VK.Auth.login(r => {
            if (r.session) {
                const userID = r.session.user.id;
                // Здесь можно сделать ник получше
                const nick = r.session.user.domain;
                // Здесь можно сделать имя получше
                const name = r.session.user.first_name
                    + ' ' + r.session.user.last_name;
                const token = r.session.sig;

                // Сохраняем в localStorage
                localStorage.setItem('name', name);
                localStorage.setItem('id', userID);

                dispatch(loginSuccess());
                dispatch(updateUserData({
                    userID: userID, userName: name,
                    userNick: nick, avatarURL: '', token: token
                }))
            } else {
                dispatch(loginFailed(new Error('Auth error')));
            }
        },)
    },
    loginDEBUG: () => {
        dispatch(loginSuccess());
        dispatch(updateUserData({
            userID: DEBUG_USER_ID, userName: 'DEBUG_NAME',
            userNick: 'DEBUG', avatarURL: '', token: '-2'
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
