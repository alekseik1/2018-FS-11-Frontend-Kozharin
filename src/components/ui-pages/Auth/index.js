import React from 'react';
import {Redirect} from "react-router-dom";
import styles from './styles.css'

class Auth extends React.Component {

    render() {
        return (
            // TODO: проверять авторизацию здесь
            <Redirect to='/dialogs' />
        );
    }
}

export default Auth;
