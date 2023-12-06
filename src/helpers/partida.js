import { useState } from "react"
import JUGADOR from "../model/jugador"
import FASE from "../model/Fase"
import useTableroBarcos from "../hooks/useTableroBarcos"
import useTableroDisparable from "../hooks/useTableroDisparable"
import resultadoDisparoHandler from "./resultadoDisparoHandler"
import { handleColocarBarco, handleDispararRandom, handleEstaListo, handleSiguienteBarco } from "./pcHandler"

const partida = (fase, setFase, addToHistorial) => {
    const [ganador, setGanador] = useState(null)
    const [turno, setTurno] = useState(null)
    const [resultadoDisparo, setResultadoDisparo] = useState(null)

    resultadoDisparoHandler(resultadoDisparo, setTurno, setGanador, addToHistorial, setFase)

    let jugadorLocal = useTableroBarcos()

    let [tableroBarcos, setTableroBarcos] = jugadorLocal

    const [
        tableroBarcosRival, 
        setTableroBarcosRival,
        colocarBarcoRival, 
        barcosRival, 
        barcoSeleccionadoRival, 
        setBarcoSeleccionadoRival, 
        orientacionRival, 
        setOrientacionRival,
    ] = useTableroBarcos()


    const listo = (barcos, jugador) => {
        if (barcos.some(barco => !barco.colocado))
            throw new Error("No se han colocado todos los barcos")
        if (fase !== FASE.PREPARACION)
            throw new Error("La partida ya ha comenzado o ha finalizado")
        if (turno) setFase(FASE.COMBATE)
        else setTurno(jugador)
    }

    const puedeMoverColocarBarcos = (jugador) => fase === FASE.PREPARACION && turno !== jugador

    const [tableroMarca, disparar] = 
        useTableroDisparable(tableroBarcosRival, setTableroBarcosRival, setResultadoDisparo, JUGADOR.LOCAL, turno)
    
    const [tableroMarcaRival, dispararRival] = 
        useTableroDisparable(tableroBarcos, setTableroBarcos, setResultadoDisparo, JUGADOR.PC, turno)

    handleSiguienteBarco(barcosRival, setBarcoSeleccionadoRival)

    handleColocarBarco(tableroBarcosRival, barcosRival, fase, setOrientacionRival, colocarBarcoRival, barcoSeleccionadoRival)

    handleEstaListo(barcosRival, fase, listo, JUGADOR.PC)

    handleDispararRandom(fase, turno, dispararRival, tableroMarcaRival)

    jugadorLocal = [...jugadorLocal, tableroMarca, disparar, puedeMoverColocarBarcos]

    return [jugadorLocal, ganador, turno, resultadoDisparo, setResultadoDisparo, listo]
}

export default partida