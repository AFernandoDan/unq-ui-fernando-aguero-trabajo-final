import React, { useEffect } from 'react'
import "./ResultadoDisparo.css"
import RESULTADO_DISPARO from '../model/resultadoDisparo'
import JUGADOR from '../model/jugador'

const ResultadoDisparo = ({resultadoDisparo, setResultadoDisparo}) => {

    useEffect(() => {
        if (!resultadoDisparo) return
        const timeout = setTimeout(() => {
            setResultadoDisparo(null)
        }, resultadoDisparo.turno === JUGADOR.LOCAL ? 1200 : 2500)
        return () => clearTimeout(timeout)
    }, [resultadoDisparo, setResultadoDisparo])

    if (!resultadoDisparo) return null
    if (resultadoDisparo.resultado === RESULTADO_DISPARO.FIN) return null
    const {resultado, posicion} = resultadoDisparo

    const baseClass = "resultado-disparo"
    const getClass = () => {
        if (resultadoDisparo.resultado === RESULTADO_DISPARO.AGUA) return `${baseClass} agua`
        if (resultadoDisparo.resultado === RESULTADO_DISPARO.TOCADO) return `${baseClass} tocado`
        if (resultadoDisparo.resultado === RESULTADO_DISPARO.HUNDIDO) return `${baseClass} hundido`
    }

    return (
        <div className={getClass()}>
            <div>
                <h2>{resultado}</h2>
                <h3>En ({posicion.x}, {posicion.y})</h3>
            </div>
        </div>
    )
}

export default ResultadoDisparo