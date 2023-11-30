import React from 'react'
import TIPO_CASILLA from '../model/tipoCasilla'
import "./Tablero.css"
import "./TableroBarcos.css"

const TableroBarcos = ({tableroBarcos, colocarBarco, setError}) => {

  const getCasillaClass = (casilla) => 
    (casilla.tipoCasilla === TIPO_CASILLA.BARCO ? "barco " : "agua ") + (casilla.tocado ? "tocado" : "")

    const handleClickCasilla = (i, j) => {
        try {
            colocarBarco(i, j)
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div>
        <h3>Tablero Barcos</h3>
        <div className="tablero preparacion">
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