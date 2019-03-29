import React from 'react';
import styles from './styles.css';
import ContentEditable from '../ContentEditable';

const TextInput = ({ onChangeListener, onEnterKeyListener, currentText = '' }) => {
    return (
        <ContentEditable
            className={styles.TextInput}
            html={currentText}
            onEnterKeyListener={onEnterKeyListener}
            onChange={onChangeListener}/>
    );
};

export default TextInput;
