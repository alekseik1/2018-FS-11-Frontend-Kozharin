import React from 'react';
import styles from './styles.css';
import getPosition from '../../../utils/geolocation/index';

const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10,
    maxiumAge: 36e5
};

const GeoInput = ({ onSuccess, onSubmit }) => {
    return (
        <button
            className={ styles.GeoButton }
            onClick={(e) => {
                onSubmit();
                getPosition(geoOptions)
                    .then(position => onSuccess(position))
                    .catch(console.error) }}
        />
    );
};

export default GeoInput;
