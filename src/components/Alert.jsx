import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, setMessage, error, info, success }) => {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    if (!message) return null;

    const getClassName = () => {
        if (error) return "error";
        if (info) return "info";
        if (success) return "success";
    };

    const finalClassName = "alert " + getClassName();

    return (
        <div className="alert-overlay">
            <div className={finalClassName}>
                {message}
            </div>
        </div>
    );
};

export default Alert;