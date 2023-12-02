import React from 'react'
import FASE from '../model/Fase'

const BotonListo = ({listo, fase, jugador, barcos, turno}) => {

    const handleClick = () => {
        listo(barcos, jugador)
    }

    const disabled = fase !== FASE.PREPARACION || barcos.some(barco => !barco.colocado) || turno === jugador


    if (fase !== FASE.PREPARACION) return null

    return (
        <div>
            {turno && <>
                {turno === jugador ? <h3>Esperando al rival</h3> : <h3>Tu rival ya esta listo</h3>}
            </>}
            <button disabled={disabled} onClick={handleClick}>Estoy listo!</button>
        </div> 
    )
}

export default BotonListo