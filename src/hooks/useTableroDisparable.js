import RESULTADO_DISPARO from "../model/resultadoDisparo"
import TIPO_CASILLA from "../model/tipoCasilla"

const estaHundido = (tablero, tipoBarco) => tablero.flat().filter(c => c.tipoBarco === tipoBarco).every(c => c.tocado)
const marcarUndidos = (tablero, tipoBarco) => 
    tablero.flat().filter(c => c.tipoBarco === tipoBarco).forEach(c => c.hundido = true)
const terminoPartida = (tablero) => tablero.flat().every(c => c.tocado || c.tipoCasilla === TIPO_CASILLA.AGUA)

const useTableroDisparable = (tableroBarcosRival, setTableroBarcosRival, setResultadoDisparo, jugador, turno) => {

    const disparar = (i, j) => {
        if (tableroBarcosRival[i][j].tocado || turno !== jugador) return

        let resultadoDisparo = RESULTADO_DISPARO.AGUA
        let nuevoTableroR = tableroBarcosRival.map(fila => fila.map(casilla => ({...casilla})))
        let casilla = nuevoTableroR[i][j]
    
        casilla.tocado = true

        if (casilla.tipoCasilla === TIPO_CASILLA.BARCO) resultadoDisparo = RESULTADO_DISPARO.TOCADO

        if (resultadoDisparo === RESULTADO_DISPARO.TOCADO && estaHundido(nuevoTableroR, casilla.tipoBarco)) {
            resultadoDisparo = RESULTADO_DISPARO.HUNDIDO
            marcarUndidos(nuevoTableroR, casilla.tipoBarco)
        }
        
        if (resultadoDisparo === RESULTADO_DISPARO.HUNDIDO && terminoPartida(nuevoTableroR))
            resultadoDisparo = RESULTADO_DISPARO.FIN

        setTableroBarcosRival(nuevoTableroR)

        setResultadoDisparo({resultado: resultadoDisparo, posicion: {x: i, y: j}, turno})
        return resultadoDisparo
    }

    return disparar
}

export default useTableroDisparable