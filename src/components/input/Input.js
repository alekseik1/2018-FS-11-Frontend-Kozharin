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

const Input = ({ dispatch, text, files, geo }) => {
    return (
        <div className={styles.Input}>
            <TextInput
                onEnterKeyListener={dispatch(messageSubmitted())}
                onChangeListener={(text) => dispatch(textSubmitted(text))}
                currentText={text}
            />
            <FileInput
                onSubmit={() => dispatch(beginPendingOperation())}
                onSuccess={(result) => {
                    dispatch(endPendingOperation()); dispatch(filesSubmitted(result));
                }}
                currentFiles={files}
            />
            <GeoInput
                onSubmit={() => dispatch(beginPendingOperation())}
                onSuccess={(result) => {
                    dispatch(endPendingOperation()); dispatch(geoSubmitted(result));
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
