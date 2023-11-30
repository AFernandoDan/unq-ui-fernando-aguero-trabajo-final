import React from 'react'
import MODO_TABLERO from '../model/ModoTablero'

const SelectorModoTablero = ({modoTablero, setModoTablero}) => {
    const handleClick = () => {
        if (modoTablero === MODO_TABLERO.MARCA) {
            setModoTablero(MODO_TABLERO.DISPARO)
        } else {
            setModoTablero(MODO_TABLERO.MARCA)
        }
    }

    const getEmoji = () => modoTablero === MODO_TABLERO.MARCA ? "📍" : "💥"

    return (
        <div className="selectorModoTablero">
            <h3>Cambia el modo del tablero</h3>
            <button onClick={handleClick}>{getEmoji()}</button>
            {modoTablero}
        </div>
    )
}

export default SelectorModoTablero