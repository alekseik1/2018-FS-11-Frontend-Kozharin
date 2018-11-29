import React from 'react';
import styles from './styles.css';
import {Link, Redirect} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goBack: false,
        }
    }

    render() {
        if (this.state.goBack) {
            console.log(this.state);
            return <Redirect to='/'/>;
        }
        return (
            <div className={styles.dialog_header}>
                <button className={styles.back_button} onClick={() => this.setState({goBack: true})} />
                <img className={styles.avatar_img} src={'https://cs7.pikabu.ru/post_img/2018/05/25/5/1527229519156826952.jpg'} />
            </div>
        );
    }
}

export default Header;
