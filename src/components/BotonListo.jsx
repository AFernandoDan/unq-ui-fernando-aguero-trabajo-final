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
            <button disabled={disabled} onClick={handleClick}>Listo</button>
            <h3>Esperando a que el rival posicione sus barcos</h3>
        </div> 
    )
}

export default BotonListo