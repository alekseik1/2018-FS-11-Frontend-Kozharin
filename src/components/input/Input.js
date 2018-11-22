import React from 'react';
import styles from './styles.css';
import TextInput from './text-input/TextInput';
import FileInput from './file-input/FileInput';
import GeoInput from "./geo-input/GeoInput";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitListener: props.onSubmit,
            files: [],
        };
    }

    _onTextSubmit(newText) {
        // Вот здесь мы должны собрать текст сообщения + аттачи. А потом отправить их выше!
        let message = {
            text: newText,
            time: new Date().toLocaleDateString(),
            files: this.state.files,
        };
        this.state.submitListener(message);
    }

    _onFilesSubmit(files) {
        this.setState({files: files});
    }

    render() {
        return (
            <div className={styles.Input}>
                <TextInput submitListener={this._onTextSubmit.bind(this)} />
                <FileInput submitListener={this._onFilesSubmit.bind(this)}/>
                <GeoInput />
            </div>
        );

    }
}

export default Input;
