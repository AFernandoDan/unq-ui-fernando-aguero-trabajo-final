import React from 'react'
import TIPO_CASILLA from '../model/tipoCasilla'
import TIPO_BARCO from '../model/tipoBarco'
import "./Tablero.css"
import "./TableroBarcos.css"
import "./Barco.css"
import TableroContainer from './TableroContainer'

const getCasillaBarcoClass = (casilla) => {
    switch (casilla.tipoBarco) {
        case TIPO_BARCO.PORTAAVIONES:
            return "portaaviones "
        case TIPO_BARCO.SUBMARINO:
            return "submarino "
        case TIPO_BARCO.LANCHA:
            return "lancha "
        case TIPO_BARCO.FRAGATA:
            return "fragata "
    }
}

const getCasillaClass = (casilla) => 
    (casilla.tipoCasilla === TIPO_CASILLA.BARCO ? getCasillaBarcoClass(casilla) : "agua ") + (casilla.tocado ? "tocado" : "")

const baseClass = "tablero "
const TableroBarcos = ({tableroBarcos, colocarBarco, setError, jugador, puedeColocarBarcos}) => {

    const disabled = !puedeColocarBarcos(jugador)
    const tableroClassName = disabled ? baseClass : baseClass + "preparacion"

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
        <h3>Tus barcos</h3>
        <TableroContainer>
            <div className={tableroClassName}>
                {tableroBarcos.map((fila, i) => (
                    fila.map((casilla, j) => (
                        <div key={j} className={`casilla ${getCasillaClass(casilla)}`} onClick={() => handleClickCasilla(i,j)}></div>
                    ))
                ))}
            </div>
        </TableroContainer>
    </div>
)
}

export default TableroBarcos