import React from 'react';
import styles from './styles.css';
import './emoji_sprites.css';
import PropTypes from 'prop-types';
import { renderToString } from 'react-dom/server';

export const emojiList =['smile', 'laugh', 'surprised', 'agree', 'heh', 'oh', 'nothappy'];

const Emoji = ({emojiName, onClick }) => {
    return <div className={emojiName} onClick={onClick} />;
};

const _get_emoji_component = (emojiName, onSelected) => (
    <Emoji
        emojiName={emojiName}
        onClick={(e) => onSelected(emojiName)}
    />);

const EmojiKeyboard = ( {visible, onSelected} ) => {
    return (
        <div className={visible ? styles.em_visible : styles.em_hidden}>
            { emojiList.map( (emojiName) => _get_emoji_component(emojiName, onSelected)) }
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
                <EmojiKeyboard
                    visible={this.state.visible}
                    onSelected={(emojiName) =>
                        this.props.onEmojiSelected(
                            renderToString(_get_emoji_component(emojiName, undefined) )
                        )
                    }
                />
            </React.Fragment>
        );
    }

    static propTypes = {
        onEmojiSelected: PropTypes.func,
    }
}

export default EmojiForm;
