import React from 'react'
import FASE from '../model/Fase'
import JUGADOR from '../model/jugador'

const getEmoji = (fase) => fase === FASE.PREPARACION ? "🛠️" : "🔫"
const esElTurno = (turno, jugador) => turno === jugador
const getColor = (turno, jugador) => esElTurno(turno, jugador) ? "lightgreen" : "crimson"

const DatosPartidaEnCurso = ({turno, fase}) => {
    const emoji = getEmoji(fase)

    return (
        <div>
            <h3>{emoji} {fase} {emoji}</h3>
            {fase === FASE.COMBATE && turno && 
                <h3>
                    <p style={{color: getColor(turno, JUGADOR.LOCAL)}}>
                        {esElTurno(turno, JUGADOR.LOCAL) ? "Es tu turno" : "Es el turno del rival"}
                    </p>
                </h3>
            }
        </div>
    )
}

export default DatosPartidaEnCurso