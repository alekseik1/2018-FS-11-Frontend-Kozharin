import React from 'react';
import styles from './styles.css';
import TextInput from './text-input/TextInput';
import FileInput from './file-input/FileInput';
import GeoInput from "./geo-input/GeoInput";
import{ connect } from 'react-redux';
import {
    messageSubmitted,
    filesSubmitted,
    textSubmitted,
    geoSubmitted,
    beginPendingOperation,
    endPendingOperation
} from "../../actions";
import { dispatch } from 'redux';
import mapStateToProps from "react-redux/es/connect/mapStateToProps";

const Input = ({ dispatch, text, files, geo, chatID }) => {
    return (
        <div className={styles.Input}>
            <TextInput
                onEnterKeyListener={dispatch(messageSubmitted(chatID))}
                onChangeListener={(text) => dispatch(textSubmitted(text, chatID))}
                currentText={text}
            />
            <FileInput
                onSubmit={() => dispatch(beginPendingOperation(chatID))}
                onSuccess={(result) => {
                    dispatch(endPendingOperation(chatID)); dispatch(filesSubmitted(result, chatID));
                }}
                currentFiles={files}
            />
            <GeoInput
                onSubmit={() => dispatch(beginPendingOperation())}
                onSuccess={(result) => {
                    dispatch(endPendingOperation(chatID)); dispatch(geoSubmitted(result, chatID));
                }}
                currentGeo={geo}
            />
        </div>
    );
};

const mapStateToProps = (state = {text: '', geo: [], files: []}) => ({
    text: state.text,
    geo: state.geo,
    files: state.files,
});

export default connect(mapStateToProps)(Input);
