import TableroDisparable from "./TableroDisparable"
import JUGADOR from "../model/jugador"
import { useEffect, useState } from "react"
import FASE from "../model/Fase"
import ResultadoDisparo from "./ResultadoDisparo"
import TableroBarcos from "./TableroBarcos"
import SelectorBarco from "./SelectorBarco"
import SelectorOrientacion from "./SelectorOrientacion"
import Alert from "./Alert"
import BotonListo from "./BotonListo"
import useTableroDisparable from "../hooks/useTableroDisparable"
import useTableroBarcos from "../hooks/useTableroBarcos"
import Inicio from "./Inicio"
import ORIENTACION from "../model/Orientacion"



const Partida = () => {
    const [ganador, setGanador] = useState(null)
    const [turno, setTurno] = useState(null)
    const [resultadoDisparo, setResultadoDisparo] = useState(null)
    const [fase, setFase] = useState(FASE.IDLE)
    const [error, setError] = useState(null)

    const [
        colocarBarcoLocal, 
        tableroBarcosLocal,
        setTableroBarcosLocal,
        barcosLocal, 
        barcoSeleccionadoLocal, 
        setBarcoSeleccionadoLocal, 
        orientacion, 
        setOrientacion,
        reiniciarTableroBarcosLocal
    ] = useTableroBarcos()

    const [
        colocarBarcoRival, 
        tableroBarcosRival, 
        setTableroBarcosRival,
        barcosRival, 
        barcoSeleccionadoRival, 
        setBarcoSeleccionadoRival, 
        orientacionRival, 
        setOrientacionRival,
        reiniciarTableroBarcosRival
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

    const [
        tableroMarcaLocal, 
        dispararLocal, 
        reiniciarTableroMarcaLocal] 
        = useTableroDisparable(tableroBarcosRival, setTableroBarcosRival, setResultadoDisparo)
    
    const [
        tableroMarcaRival, 
        dispararRival, 
        reiniciarTableroMarcaRival
    ]
        = useTableroDisparable(tableroBarcosLocal, setTableroBarcosLocal, setResultadoDisparo)

    const getRandomPosValida = (barco, orientacion) => {
        let maxdDelLadoOrientado = Math.floor(Math.random() * (9 - barco.longitud))
        let maxdDelLadoNoOrientado = Math.floor(Math.random() * 10)

        return orientacion === ORIENTACION.HORIZONTAL 
            ? {x: Math.floor(maxdDelLadoOrientado), y: Math.floor(maxdDelLadoNoOrientado)} 
            : {x: Math.floor(maxdDelLadoNoOrientado), y: Math.floor(maxdDelLadoOrientado)}
    }

    const intentarColocarBarcoEnPosRandom = (barco, orientacion, colocarBarco) => {
        let {x,y} = getRandomPosValida(barco, orientacion)
        try {
            colocarBarco(x, y)
            return true
        } catch (error) {
            return false
        }
    }

    // cuando se coloca un barco, se selecciona el siguiente barco
    useEffect(() => {
        if (barcosRival && barcosRival.some(barco => !barco.colocado)) {
            setBarcoSeleccionadoRival(barcosRival.find(barco => !barco.colocado))
        }
    }, [barcosRival])

    // cuando se selecciona un barco, se intenta colocar en una posicion random
    useEffect(() => {
        if (tableroBarcosRival && barcosRival && fase === FASE.PREPARACION && barcosRival.some(barco => !barco.colocado)) {
            const colocarBarcoRandom = (colocarBarco, setOrientacion) => {
                let seColoco = false
                while (!seColoco) {
                    let orientacion = Math.floor(Math.random() * 2) === 0 ? ORIENTACION.HORIZONTAL : ORIENTACION.VERTICAL
                    setOrientacion(orientacion)
                    seColoco = intentarColocarBarcoEnPosRandom(barcoSeleccionadoRival, orientacion, colocarBarco)
                }
            }

            const timeout = setTimeout(() => {
                colocarBarcoRandom(colocarBarcoRival, setOrientacionRival)
            }, Math.floor(Math.random() * 7) + 3000);
            return () => clearTimeout(timeout)
        }
    }, [barcoSeleccionadoRival, colocarBarcoRival, setOrientacionRival])

    // cuando la partida esta en preparacion la pc espera de 15s a 60s para poner listo
    useEffect(() => {
            if (fase !== FASE.PREPARACION || !barcosRival || barcosRival.some(barco => !barco.colocado)) return
            listo(barcosRival, JUGADOR.PC)
    }, [fase, barcosRival])


    const iniciarPartida = () => {
        setFase(FASE.PREPARACION)
        setGanador(null)
        setTurno(null)
        setResultadoDisparo()
        setError(null)
        reiniciarTableroMarcaLocal()
        reiniciarTableroMarcaRival()
        reiniciarTableroBarcosLocal()
        reiniciarTableroBarcosRival()
    }

    const irAlInicio = () => {
        setFase(FASE.IDLE)
    }

    return (<div>
        <Alert message={error} setMessage={setError} error />
        <ResultadoDisparo resultadoDisparo={resultadoDisparo} setResultadoDisparo={setResultadoDisparo} turno={turno} />
        {fase === FASE.IDLE && <Inicio iniciarPartida={iniciarPartida} />}
        {fase !== FASE.IDLE && <h2>Partida: [fase: {fase}, turno: {turno}, ganador: {JSON.stringify(ganador)}]</h2>}
        {fase === FASE.PREPARACION && <>
            <SelectorBarco 
                barcos={barcosLocal}
                setBarcoSeleccionado={setBarcoSeleccionadoLocal}
                barcoSeleccionado={barcoSeleccionadoLocal} />
            <SelectorOrientacion orientacion={orientacion} setOrientacion={setOrientacion} />
            <BotonListo listo={listo} fase={fase} jugador={JUGADOR.LOCAL} barcos={barcosLocal} turno={turno} />
            <TableroBarcos 
                setError={setError}
                colocarBarco={colocarBarcoLocal}
                tableroBarcos={tableroBarcosLocal}
                jugador={JUGADOR.LOCAL}
                puedeColocarBarcos={puedeMoverColocarBarcos}
                />
            <TableroBarcos
                setError={setError}
                colocarBarco={colocarBarcoRival}
                tableroBarcos={tableroBarcosRival}
                jugador={JUGADOR.PC}
                puedeColocarBarcos={puedeMoverColocarBarcos}
                />
        </>}
        {fase === FASE.COMBATE && <>
            <TableroDisparable
                tablero={tableroMarcaLocal}
                disparar={dispararLocal}
                />
        </>}
    </div>)
}

export default Partida