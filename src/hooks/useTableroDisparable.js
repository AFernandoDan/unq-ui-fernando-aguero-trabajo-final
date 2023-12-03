import { useState } from "react"
import ANOTADOR from "../model/Anotador"
import RESULTADO_DISPARO from "../model/resultadoDisparo"
import TIPO_CASILLA from "../model/tipoCasilla"

const tableroMarcasInicial = Array(10).fill(Array(10).fill(ANOTADOR.VACIO))

const useTableroDisparable = (tableroBarcosRival, setTableroBarcosRival, setResultadoDisparo, jugador, turno) => {

    const [tablero, setTablero] = useState(tableroMarcasInicial)

    const reiniciar = () => setTablero(tableroMarcasInicial)

    const disparar = (i, j) => {
        if (tablero[i][j] !== ANOTADOR.VACIO || turno !== jugador) return

        let resultadoDisparo = RESULTADO_DISPARO.AGUA
        let nuevoTablero = tableroBarcosRival.map(fila => [...fila])
        let casilla = nuevoTablero[i][j]
    
        if (casilla.tipoCasilla === TIPO_CASILLA.BARCO) {
                casilla.tocado = true
                resultadoDisparo = RESULTADO_DISPARO.TOCADO
    
                // Comprobar si todas las casillas del mismo tipo de barco están tocadas
                let todasTocadas = nuevoTablero.flat().filter(c => c.tipoBarco === casilla.tipoBarco).every(c => c.tocado)
                if (todasTocadas) {
                    resultadoDisparo = RESULTADO_DISPARO.HUNDIDO
    
                    // Comprobar si todos los barcos están hundidos
                    let todosHundidos = nuevoTablero.flat().filter(c => c.tipoCasilla === TIPO_CASILLA.BARCO).every(c => c.tocado)
                    if (todosHundidos) {
                        resultadoDisparo = RESULTADO_DISPARO.FIN
                    }
                }
        }
    
        setTableroBarcosRival(nuevoTablero)
        const marcador = resultadoDisparo === RESULTADO_DISPARO.AGUA ? ANOTADOR.BLANCO : ANOTADOR.AMARILLO
        handleMarcar(i, j, marcador)
        setResultadoDisparo({resultado: resultadoDisparo, posicion: {x: i, y: j}, turno})
        return resultadoDisparo
    }

    const handleMarcar = (i, j, marcador) => {
        const nuevoTablero = tablero.map(fila => [...fila])
        nuevoTablero[i][j] = marcador
        setTablero(nuevoTablero)
    }

    return [tablero, disparar, reiniciar]
}

export default useTableroDisparable