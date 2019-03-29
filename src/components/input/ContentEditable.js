import ReactDOM from "react-dom";
import React from 'react';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component{

    render() {
        return <div
            className={this.props.className}
            onInput={this.emitChange.bind(this)}
            onBlur={this.emitChange.bind(this)}
            style={{display: 'flex', flexDirection: 'row'}}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}} />;
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    emitChange() {
        let html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }

    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func
    }
}

export default ContentEditable;