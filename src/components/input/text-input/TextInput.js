import React from 'react';
import styles from './styles.css';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currText: '',
            submitListener: props.submitListener,
        };
    }

    _onKeypress(e) {
        if (e.charCode === 13) {
            this._onSubmit(e);
        }
    }

    _onChange(e) {
        this.setState({currText: e.target.value});
    }

    _onSubmit(e) {
        this.setState({currText: ''});
        // Передаем сообщение выше!
        this.state.submitListener(this.state.currText);
    }

    render() {
        const inputForm =  <input
            className={styles.TextInput}
            onChange={this._onChange.bind(this)}
            onKeyPress={this._onKeypress.bind(this)}
            value={this.state.currText}
            placeholder={'Введите сообщение...'}
        />;
        return inputForm
    }
}

export default TextInput;
