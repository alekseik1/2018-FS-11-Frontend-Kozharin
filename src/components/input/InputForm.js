import React from 'react';
import styles from './styles.css';
import TextInput from './text-input/TextInput';
import FileInput from './file-input/FileInput';
import GeoInput from "./geo-input/GeoInput";
import EmojiForm from './emoji-form/EmojiForm'
import PropTypes from 'prop-types';

const InputForm = ({ onMessageSubmit, onTextChanged, onFilesSubmitted, onGeoSubmitted, currentText, onEmojiSelected }) => {
    return (
        <div className={styles.Input}>
            <TextInput
                onEnterKeyListener={onMessageSubmit}
                onChangeListener={onTextChanged}
                currentText={currentText}
            />
            <FileInput
                onSuccess={onFilesSubmitted}
            />
            <EmojiForm
                onEmojiSelected={onEmojiSelected}
            />
            <GeoInput
                onSuccess={onGeoSubmitted}
            />
        </div>
    );
};

InputForm.propTypes = {
    onMessageSubmit: PropTypes.func,
    onTextChanged: PropTypes.func,
    onFilesSubmitted: PropTypes.func,
    onGeoSubmitted: PropTypes.func,
    currentText: PropTypes.string,
    onEmojiSelected: PropTypes.func,
};

export default InputForm;
