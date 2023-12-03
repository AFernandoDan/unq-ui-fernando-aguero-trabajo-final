import JUGADOR from "../model/jugador";

const HISTORIAL = 'historial';

const { LOCAL, PC } = JUGADOR;

const initialHistorial = {
    [LOCAL]: 0,
    [PC]: 0
}

export const getHistorialLS = () => {
  const historial = localStorage.getItem(HISTORIAL)
  return JSON.parse(historial) || initialHistorial; 
}

export const setHistorialLS = (historial) => {
  localStorage.setItem(HISTORIAL, JSON.stringify(historial));
}

export const clearHistorialLS = () => {
    localStorage.removeItem(HISTORIAL);
}