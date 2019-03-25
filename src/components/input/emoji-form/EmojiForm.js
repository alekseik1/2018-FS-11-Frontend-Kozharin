import React from 'react';
import styles from './styles.css';

export var emojiList =['smile', 'laugh', 'surprised', 'agree', 'heh', 'oh', 'nothappy'];

const htmlEmojiList = (emojiList) => {
    let htmlList = [];
    for (let i=0; i < emojiList.length; i++) {
        htmlList.push(
            <a className={styles[emojiList[i]]} key={i} />
        );
    }
    return htmlList;
};

const EmojiKeyboard = (props) => {
    return (
        <div className={props.visible ? styles.em_visible : styles.em_hidden}>
            {htmlEmojiList(emojiList)}
        </div>
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
                    className={styles.EmojiButton}
                    onClick={this.toggleVisibility.bind(this)}
                />
                <EmojiKeyboard visible={this.state.visible}/>
            </React.Fragment>
        );
    }
}

export default EmojiForm;
