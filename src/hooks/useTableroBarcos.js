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

    const reiniciar = () => {
        setBarcos(barcosIniciales)
        setBarcoSeleccionado(barcosIniciales[0])
        setTableroBarcos(tableroBarcosInicial)
        setOrientacion(ORIENTACION.HORIZONTAL)
    }

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

        console.log(nuevoTablero.flat().filter(c => c.tipoCasilla === TIPO_CASILLA.BARCO).length)
    
        // Comprobar si ya hay un barco en las posiciones que va a ocupar el barco
        for (let k = 0; k < barcoSeleccionado.longitud; k++) {
            if ((orientacion === ORIENTACION.HORIZONTAL && nuevoTablero[i][j + k].tipoCasilla === TIPO_CASILLA.BARCO))
                throw new Error(`Hay un ${nuevoTablero[i][j + k].tipoBarco} en la posición (${i}, ${j + k})`)
            if ((orientacion === ORIENTACION.VERTICAL && nuevoTablero[i + k][j].tipoCasilla === TIPO_CASILLA.BARCO))
                throw new Error(`Hay un ${nuevoTablero[i + k][j].tipoBarco} en la posición (${i + k}, ${j})`)
        }
    
        marcarBarcoColocado(barcoSeleccionado, barcos, setBarcos, setBarcoSeleccionado)
        setTableroBarcos([...colocarBarcoCuandoSePuede(barcoSeleccionado, i, j, orientacion, nuevoTablero)])
    }

    const colocarBarcoCuandoSePuede = (barco, i, j, orientacion, tablero) => {
        for (let k = 0; k < barco.longitud; k++) {
            let barcoAColocar = {...barco, tipoCasilla: TIPO_CASILLA.BARCO, tocado: false}
            if (orientacion === ORIENTACION.HORIZONTAL) {
                tablero[i] = [...tablero[i]]
                tablero[i][j + k] = barcoAColocar
            } else { // ORIENTACION.VERTICAL
                tablero[i + k] = [...tablero[i + k]]
                tablero[i + k][j] = barcoAColocar
            }
        }

        return tablero
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

    return [
        colocarBarco, 
        tableroBarcos, 
        setTableroBarcos, 
        barcos, 
        barcoSeleccionado, 
        setBarcoSeleccionado, 
        orientacion, 
        setOrientacion,
        reiniciar
    ]
}

export default useTableroBarcos