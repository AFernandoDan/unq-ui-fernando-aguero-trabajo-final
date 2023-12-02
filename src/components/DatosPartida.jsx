import React from 'react'
import FASE from '../model/Fase'
import DatosPartidaFinalizada from './DatosPartidaFinalizada'
import DatosPartidaEnCurso from './DatosPartidaEnCurso'

const DatosPartida = ({fase, turno, ganador}) => {

    if (fase === FASE.IDLE) return null
    return <>
        {fase === FASE.FINALIZADA ? <DatosPartidaFinalizada ganador={ganador} /> : <DatosPartidaEnCurso turno={turno} fase={fase} />}
    </>
}

export default DatosPartida