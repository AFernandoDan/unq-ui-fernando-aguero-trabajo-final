import React from 'react'
import TIPO_CASILLA from '../model/tipoCasilla'
import "./Tablero.css"
import "./TableroBarcos.css"

const baseClass = "tablero "
const TableroBarcos = ({tableroBarcos, colocarBarco, setError, jugador, puedeColocarBarcos}) => {

    const disabled = !puedeColocarBarcos(jugador)
    const tableroClassName = disabled ? baseClass : baseClass + "preparacion"

    const getCasillaClass = (casilla) => 
        (casilla.tipoCasilla === TIPO_CASILLA.BARCO ? "barco " : "agua ") + (casilla.tocado ? "tocado" : "")

    const handleClickCasilla = (i, j) => {
        if (disabled) return
        try {
            colocarBarco(i, j)
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div>
        <h3>Tablero Barcos</h3>
        <div className={tableroClassName}>
            {tableroBarcos.map((fila, i) => (
                fila.map((casilla, j) => (
                    <div key={j} className={`casilla ${getCasillaClass(casilla)}`} onClick={() => handleClickCasilla(i,j)}></div>
                ))
            ))}
        </div>
    </div>
)
}

export default TableroBarcos