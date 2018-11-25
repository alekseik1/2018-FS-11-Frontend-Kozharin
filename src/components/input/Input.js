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
            geo: {
                coords: {
                    latitude: null,
                    longitude: null
                }
            },
        };
    }

    _onTextSubmit(newText) {
        // Вот здесь мы должны собрать текст сообщения + аттачи. А потом отправить их выше!
        let message = {
            text: newText,
            time: new Date().toISOString(),
            files: this.state.files,
            geo: this.state.geo,
        };
        // Если есть текст сообщения, либо хотя бы один аттач, то отправим
        if(newText.length !== 0 || this.state.files.length !== 0) {
            this.state.submitListener(message);
            // Очищаем файлы
            this.setState({files: []});
        }
    }

    _onFilesSubmit(files) {
        this.setState({files: files});
    }

    _onGeoSubmit(position) {
        this.setState({geo: position});
    }

    render() {
        return (
            <div className={styles.Input}>
                <TextInput submitListener={this._onTextSubmit.bind(this)} />
                <FileInput submitListener={this._onFilesSubmit.bind(this)}/>
                <GeoInput submitListener={this._onGeoSubmit.bind(this)} />
            </div>
        );

    }
}

export default Input;
