import React from 'react';
import styles from './styles.css';

const EmojiKeyboard = (props) => {
    return (
        <div className={props.visible ? styles.em_visible : styles.em_hidden}>Emojis :)</div>
    )
};

class EmojiForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    toggleVisibility() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        return (
            <React.Fragment>
                <button
                    className={styles.EmojiForm}
                    onClick={this.toggleVisibility.bind(this)}
                />
                <EmojiKeyboard visible={this.state.visible}/>
            </React.Fragment>
        );
    }
}

export default EmojiForm;
