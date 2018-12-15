import React from 'react';
import styles from './styles.css';
import {Link, Redirect} from "react-router-dom";

const Header = ({ onBack, avatarURL, fullName, lastOnline }) => {
    console.log(avatarURL, fullName, lastOnline);
    return (
        <div className={styles.dialog_header}>

            <button
                className={styles.back_button}
                onClick={() => onBack()}
            />

            <img className={styles.avatar_img} src={avatarURL} />
            <div className={styles.person_info_container}>
                <div className={styles.full_name}>{fullName}</div>
                <div className={styles.last_online}>{lastOnline}</div>
            </div>
        </div>
    );
};

export default Header;
