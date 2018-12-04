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
            return <Redirect to={this.props.prevLink}/>;
        }
        return (
            <div className={styles.dialog_header}>

                <button
                    className={styles.back_button}
                    onClick={() => this.setState({goBack: true})}
                />

                <img className={styles.avatar_img} src={this.props.avatarURL} />
                <div className={styles.person_info_container}>
                    <div className={styles.full_name}>{this.props.fullName}</div>
                    <div className={styles.last_online}>{this.props.lastOnline}</div>
                </div>
            </div>
        );
    }
}

export default Header;
