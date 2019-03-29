import React from 'react';
import styles from './styles.css';
import './emoji_sprites.css';

export var emojiList =['smile', 'laugh', 'surprised', 'agree', 'heh', 'oh', 'nothappy'];

const Emoji = ({emojiName, onEmojiSelected }) => {
    return <a className={emojiName} onClick={onEmojiSelected} />;
};

const EmojiKeyboard = ( {visible, onEmojiSelected} ) => {
    return (
        <div className={visible ? styles.em_visible : styles.em_hidden}>
            {emojiList.map( (emojiName) =>
                <Emoji emojiName={emojiName} onEmojiSelected={onEmojiSelected}/>
                )
            }
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
                <EmojiKeyboard visible={this.state.visible} onEmojiSelected={() => console.log('Emoji selected')}/>
            </React.Fragment>
        );
    }
}

export default EmojiForm;
