import React from 'react';
import styles from './styles.css';

const TextInput = ({ onChangeListener, onEnterKeyListener, currentText = '' }) => {
    return (
        <input
            className={styles.TextInput}
            onChange={onChangeListener}
            onKeyPress={(e) => (e.charCode === 13) ? onEnterKeyListener() : null}
            value={currentText}
            placeholder={'Введите сообщение...'}
        />
    );
};

export default TextInput;
