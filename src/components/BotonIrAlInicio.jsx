import React from 'react'
import FASE from '../model/Fase'

const BotonIrAlInicio = ({fase, setFase}) => {

    const irAlInicio = () => setFase(FASE.IDLE)

    return (
        <>
            {fase === FASE.FINALIZADA && <button onClick={irAlInicio}>Ir al inicio</button>}
        </>
    )
}

export default BotonIrAlInicio