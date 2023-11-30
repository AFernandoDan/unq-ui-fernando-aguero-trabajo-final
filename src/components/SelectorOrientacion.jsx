import React from 'react'
import ORIENTACION from '../model/Orientacion'

const SelectorOrientacion = ({orientacion, setOrientacion}) => {
    const handleClick = () => {
        if (orientacion === ORIENTACION.HORIZONTAL) {
            setOrientacion(ORIENTACION.VERTICAL)
        } else {
            setOrientacion(ORIENTACION.HORIZONTAL)
        }
    }
    return (
        <div className="selector-orientacion">
            <h3>Cambia la orientacion del barco a colocar: </h3>
            <button onClick={handleClick}>{orientacion}</button>
        </div>
    )
}

export default SelectorOrientacion