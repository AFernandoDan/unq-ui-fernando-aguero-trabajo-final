import { useState } from "react"
import ORIENTACION from "../model/Orientacion"
import TIPO_BARCO from "../model/TipoBarco"
import TIPO_CASILLA from "../model/tipoCasilla"

const barcosIniciales = [
    {tipoBarco: TIPO_BARCO.PORTAAVIONES, longitud: 4, colocado: false},
    {tipoBarco: TIPO_BARCO.SUBMARINO, longitud: 4, colocado: false},
    {tipoBarco: TIPO_BARCO.FRAGATA, longitud: 4, colocado: false},
    {tipoBarco: TIPO_BARCO.LANCHA, longitud: 2, colocado: false},
]

const tableroBarcosInicial = Array(10).fill(Array(10).fill({tipoCasilla: TIPO_CASILLA.AGUA}))

const useTableroBarcos = () => {
    const [barcos, setBarcos] = useState(barcosIniciales)
    const [barcoSeleccionado, setBarcoSeleccionado] = useState(barcos[0])
    const [tableroBarcos, setTableroBarcos] = useState(tableroBarcosInicial)
    const [orientacion, setOrientacion] = useState(ORIENTACION.HORIZONTAL)

    const colocarBarco = (i, j) => {
        const nuevoTablero = [...tableroBarcos]
    
        // Comprobar si el barco cabe en el tablero
        if ((orientacion === ORIENTACION.HORIZONTAL && j + barcoSeleccionado.longitud > nuevoTablero[0].length) ||
            (i + barcoSeleccionado.longitud > nuevoTablero.length))
            throw new Error('El barco no cabe en el tablero')

        // quita los barcos que ya estan colocados con el mismo tipo
        // reemplazando por agua
        for (let k = 0; k < nuevoTablero.length; k++) {
            for (let l = 0; l < nuevoTablero[k].length; l++) {
                if (nuevoTablero[k][l].tipoBarco === barcoSeleccionado.tipoBarco) {
                    nuevoTablero[k] = [...nuevoTablero[k]]
                    nuevoTablero[k][l] = {...nuevoTablero[k][l], tipoCasilla: TIPO_CASILLA.AGUA}
                }
            }
        }
    
        // Comprobar si ya hay un barco en las posiciones que va a ocupar el barco
        for (let k = 0; k < barcoSeleccionado.longitud; k++) {
            if ((orientacion === ORIENTACION.HORIZONTAL && nuevoTablero[i][j + k].tipoCasilla === TIPO_CASILLA.BARCO) ||
                (orientacion === ORIENTACION.VERTICAL && nuevoTablero[i + k][j].tipoCasilla === TIPO_CASILLA.BARCO))
                throw new Error(`Hay un ${nuevoTablero[i][j + k].tipoBarco} en (${i}, ${j + k})`)
        }
    
        // Colocar el barco en el tablero
        for (let k = 0; k < barcoSeleccionado.longitud; k++) {
            let barcoAColocar = {...barcoSeleccionado, tipoCasilla: TIPO_CASILLA.BARCO, tocado: false}
            if (orientacion === ORIENTACION.HORIZONTAL) {
                nuevoTablero[i] = [...nuevoTablero[i]]
                nuevoTablero[i][j + k] = barcoAColocar
            } else { // ORIENTACION.VERTICAL
                nuevoTablero[i + k] = [...nuevoTablero[i + k]]
                nuevoTablero[i + k][j] = barcoAColocar
            }
        }
    
        marcarBarcoColocado(barcoSeleccionado, barcos, setBarcos, setBarcoSeleccionado)
        setTableroBarcos(nuevoTablero)
    }
    
    const marcarBarcoColocado = (barcoSeleccionado, barcos, setBarcos, setBarcoSeleccionado) => {
        const barcosActualizados = barcos.map(barco => {
            if (barco.tipoBarco === barcoSeleccionado.tipoBarco) {
                return {...barco, colocado: true}
            }
            return barco
        })
        setBarcos(barcosActualizados)
        const barcoSeleccionadoActualizado = barcosActualizados.find(barco => barcoSeleccionado.tipoBarco === barco.tipoBarco)
        setBarcoSeleccionado(barcoSeleccionadoActualizado)
    }

    return [colocarBarco, tableroBarcos, setTableroBarcos, barcos, barcoSeleccionado, setBarcoSeleccionado, orientacion, setOrientacion]
}

export default useTableroBarcos