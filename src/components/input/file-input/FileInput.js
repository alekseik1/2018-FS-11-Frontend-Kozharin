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

    _handleClick(e) {
        this.uploadInput.click();
        e.preventDefault();
    }

    render() {
        return (
            <div className={styles.placeholder}>
                <button className={styles.FileButton} onClick={this._handleClick.bind(this)} />
                <input
                    type='file'
                    ref={(ref) => this.uploadInput = ref}
                    className={styles.FileInput}
                    onChange={this._onChange.bind(this)}
                />
            </div>
        );
    }
}

export default FileInput;
