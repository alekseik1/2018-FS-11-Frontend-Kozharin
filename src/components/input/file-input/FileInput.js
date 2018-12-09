import React from 'react';
import styles from './styles.css';


class FileInput extends React.Component {

    _onChange(e) {
        let files = e.target.files;
        this.props.submitListener(files);
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
