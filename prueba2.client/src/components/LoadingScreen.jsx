import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/LoadingScreen.css';

export const LoadingScreen = ({ message }) => {
    return (
        <div className="loading-container">
            <div className="spinner-wrapper">
                <ProgressSpinner strokeWidth="4" style={{ width: '60px', height: '60px' }} />
                <p className="loading-text">{message}</p>
            </div>
        </div>
    );
};