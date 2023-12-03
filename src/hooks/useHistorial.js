import { useState } from 'react';
import { getHistorialLS, setHistorialLS, clearHistorialLS } from '../helpers/historial';

const useHistorial = () => {
    const [historial, setHistorial] = useState(getHistorialLS());

    const clearHistorial = () => {
        clearHistorialLS();
        const historialReset = getHistorialLS();
        setHistorial(historialReset);
    }

    const addToHistorial = (ganadorPartida) => {
        const newHistorial = {...historial};
        newHistorial[ganadorPartida] += 1;
        setHistorial(newHistorial);
        setHistorialLS(newHistorial);
    }

    return { historial, clearHistorial, addToHistorial };
}

export default useHistorial;