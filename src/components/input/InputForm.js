import React from 'react';
import styles from './styles.css';
import TextInput from './text-input/TextInput';
import FileInput from './file-input/FileInput';
import GeoInput from "./geo-input/GeoInput";

const InputForm = ({ onMessageSubmit, onTextChanged, onFilesSubmitted, onGeoSubmitted }) => {
    return (
        <div className={styles.Input}>
            <TextInput
                onEnterKeyListener={onMessageSubmit}
                onChangeListener={onTextChanged}
            />
            <FileInput
                onSuccess={onFilesSubmitted}
            />
            <GeoInput
                onSuccess={onGeoSubmitted}
            />
        </div>
    );
};

export default InputForm;
