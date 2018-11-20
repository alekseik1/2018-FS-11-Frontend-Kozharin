import React from 'react';
import styles from './styles.css';


class FileInput extends React.Component {

    render() {
        return (
            <div className={styles.placeholder}>
                <input type='file' className={styles.FileInput} />
            </div>
        );
    }
}

export default FileInput;
