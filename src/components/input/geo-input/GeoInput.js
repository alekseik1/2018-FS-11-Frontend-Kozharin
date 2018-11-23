import React from 'react';
import styles from './styles.css';
import getPosition from '../../../utils/geolocation/index';

const geoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maxiumAge: 36e5
};

class GeoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitListener: props.submitListener,
        };
    }

    getGeo() {
        getPosition(geoOptions).then(
            position => this.state.submitListener(position)
        ).catch(
            console.error
        );
    }

    render() {
        return <button className={styles.GeoButton} onClick={this.getGeo.bind(this)} />;
    }
}

export default GeoInput;
