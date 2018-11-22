import React from 'react';
import styles from './styles.css';


class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitListener: props.submitListener,
        }
    }

    _onChange(e) {
        let files = e.target.files;
        console.log(e);
        console.log(files);
        this.state.submitListener(files);
    }


    render() {
        return (
            <div className={styles.placeholder}>
                <input type='file' className={styles.FileInput} onChange={this._onChange.bind(this)} />
            </div>
        );
    }
}

export default FileInput;
