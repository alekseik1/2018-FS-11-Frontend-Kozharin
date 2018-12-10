import React from 'react';
import {Redirect} from "react-router-dom";
import { dispatch } from 'react-redux'
import { connect } from 'react-redux';
import styles from './styles.css';
import { userAuthorized } from "../../../actions";

const DEBUG_USER_ID = 1;

const Auth = ({ onAuthCallback }) => {
    onAuthCallback();
    return (
        <Redirect to={`/dialogs/id${DEBUG_USER_ID}`} />
    )
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onAuthCallback: () => dispatch(userAuthorized(
        DEBUG_USER_ID
    )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
