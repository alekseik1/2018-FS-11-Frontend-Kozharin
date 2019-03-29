import React from 'react';
import styles from './styles.css';
import './emoji_sprites.css';
import PropTypes from 'prop-types';

export const emojiList =['smile', 'laugh', 'surprised', 'agree', 'heh', 'oh', 'nothappy'];

const Emoji = ({emojiName, onClick }) => {
    return <a className={emojiName} onClick={onClick} />;
};

const EmojiKeyboard = ( {visible, onSelected} ) => {
    return (
        <div className={visible ? styles.em_visible : styles.em_hidden}>
            {emojiList.map( (emojiName) =>
                <Emoji emojiName={emojiName} onClick={(e) => onSelected(emojiName)}/>
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
                <EmojiKeyboard visible={this.state.visible}
                               onSelected={(emojiName) => this.props.onEmojiSelected(emojiName)}/>
            </React.Fragment>
        );
    }

    static propTypes = {
        onEmojiSelected: PropTypes.func,
    }
}

export default EmojiForm;
