import React from 'react'
import JUGADOR from '../model/jugador'

const esElGanador = (ganador) => ganador === JUGADOR.LOCAL
const getColor = (ganador) => esElGanador(ganador) ? "lightgreen" : "crimson"

const DatosPartidaFinalizada = ({ganador}) => {

    return (
        <h2 style={{fontSize: "3rem", color: getColor(ganador)}}>{esElGanador(ganador) ? "Ganaste!" : "Perdiste :("}</h2>
    )
}

export default DatosPartidaFinalizada