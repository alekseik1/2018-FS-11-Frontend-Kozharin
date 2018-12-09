import React from 'react';
import styles from './styles.css';

const FileInput = ({ currentFiles = [], onSuccess, onSubmit }) => {
    let uploadInput;
    return (
        <div className={ styles.placeholder }>
            <button
                className={ styles.FileButton }
                onClick={ uploadInput.click() }
            />
            <input
                type='file'
                ref={ (ref) => uploadInput = ref }
                className={ styles.FileInput }
                onClick={(e) => onSubmit()}
                onChange={ (e) => onSuccess(e.target.files) }
            />
        </div>
    );
};

export default FileInput;
