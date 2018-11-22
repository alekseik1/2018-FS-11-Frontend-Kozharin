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
        };
    }

    _onTextSubmit(newText) {
        // Вот здесь мы должны собрать текст сообщения + аттачи. А потом отправить их выше!
        let message = {
            text: newText,
            time: new Date().toLocaleDateString(),
            files: [],
        };
        this.state.submitListener(message);
    }

    render() {
        return (
            <div className={styles.Input}>
                <TextInput submitListener={this._onTextSubmit.bind(this)} />
                <FileInput />
                <GeoInput />
            </div>
        );

    }
}

export default Input;
