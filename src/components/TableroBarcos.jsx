import React, { useState } from 'react'
import TIPO_CASILLA from '../model/tipoCasilla'
import TIPO_BARCO from '../model/tipoBarco'
import "./Tablero.css"
import "./TableroBarcos.css"
import "./Barco.css"
import TableroContainer from './TableroContainer'
import FASE from '../model/Fase'
import Alert from "./Alert"

const getCasillaBarcoClass = (tipoBarco) => {
    switch (tipoBarco) {
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

const getCasillaClass = (casilla, barcoSeleccionado) => 
    (casilla.tipoCasilla === TIPO_CASILLA.BARCO ? getCasillaBarcoClass(casilla.tipoBarco) : "agua ") + 
    (casilla.tocado ? "tocado " : "") +
    (casilla.esPosible ? "posible " + getCasillaBarcoClass(barcoSeleccionado.tipoBarco) : "")


const baseClass = "tablero "
const TableroBarcos = ({tableroBarcos, colocarBarco, jugador, puedeColocarBarcos, casillasEnLasQueSePodriaColocar, setTableroBarcos, barcoSeleccionado, fase}) => {
    const [error, setError] = useState(null)

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

    const handleHoverCasilla = (i, j) => {
        if (disabled) return
        
        setTableroBarcos(tableroBarcos.map((fila, k) => fila.map((casilla, l) => {
            if (k === i && l === j) return {...casilla, esPosible: true}
            if (casillasEnLasQueSePodriaColocar(i,j).some(pos => pos.x === k && pos.y === l)) return {...casilla, esPosible: true}
            return {...casilla, esPosible: false}
        })))
    }

    const limpiarCasillasPosibles = () => {
        if (disabled) return
        setTableroBarcos(tableroBarcos.map((fila) => fila.map((casilla) => ({...casilla, esPosible: false}))))
    }

    if (!(fase === FASE.PREPARACION || fase === FASE.COMBATE)) return null 

    return (
        <div>
            <Alert message={error} setMessage={setError} error />
            <h3>Tus barcos</h3>
            <TableroContainer>
                <div className={tableroClassName} onMouseLeave={limpiarCasillasPosibles}>
                    {tableroBarcos.map((fila, i) => (
                        fila.map((casilla, j) => (
                            <div 
                                key={j} 
                                className={`casilla ${getCasillaClass(casilla, barcoSeleccionado)}`} 
                                onClick={() => handleClickCasilla(i,j)}
                                onMouseEnter={() => handleHoverCasilla(i,j)}
                                >
                            </div>
                        ))
                    ))}
                </div>
            </TableroContainer>
        </div>
    )
}

export default TableroBarcos