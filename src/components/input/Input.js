import React from 'react';
import './styles.css';
import TextInput from './text-input/TextInput';
import FileInput from './file-input/FileInput';
import GeoInput from "./geo-input/GeoInput";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.setState()
    }

    render() {
        return (
            <div className='Input'>
                <TextInput />
                <FileInput />
                <GeoInput />
            </div>
        );

    }
}

export default Input;
