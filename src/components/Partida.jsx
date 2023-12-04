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
import RESULTADO_DISPARO from "../model/resultadoDisparo"
import ANOTADOR from "../model/Anotador"
import DatosPartida from "./DatosPartida"
import useHistorial from "../hooks/useHistorial"

const getRandomPosValidaBarco = (barco, orientacion) => {
    let maxdDelLadoOrientado = Math.floor(Math.random() * (9 - barco.longitud))
    let maxdDelLadoNoOrientado = Math.floor(Math.random() * 10)

    return orientacion === ORIENTACION.HORIZONTAL 
        ? {x: Math.floor(maxdDelLadoOrientado), y: Math.floor(maxdDelLadoNoOrientado)} 
        : {x: Math.floor(maxdDelLadoNoOrientado), y: Math.floor(maxdDelLadoOrientado)}
}



const Partida = () => {
    const [ganador, setGanador] = useState(null)
    const [turno, setTurno] = useState(null)
    const [resultadoDisparo, setResultadoDisparo] = useState(null)
    const [fase, setFase] = useState(FASE.IDLE)
    const [error, setError] = useState(null)
    const {historial, addToHistorial, clearHistorial} = useHistorial()

    const [
        colocarBarcoLocal, 
        tableroBarcosLocal,
        setTableroBarcosLocal,
        barcosLocal, 
        barcoSeleccionadoLocal, 
        setBarcoSeleccionadoLocal, 
        orientacion, 
        setOrientacion,
        reiniciarTableroBarcosLocal,
        casillasEnLasQueSePodiraColocarLocal
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
        = useTableroDisparable(tableroBarcosRival, setTableroBarcosRival, setResultadoDisparo, JUGADOR.LOCAL, turno)
    
    const [
        tableroMarcaRival, 
        dispararRival, 
        reiniciarTableroMarcaRival
    ]
        = useTableroDisparable(tableroBarcosLocal, setTableroBarcosLocal, setResultadoDisparo, JUGADOR.PC, turno)

    const intentarColocarBarcoEnPosRandom = (barco, orientacion, colocarBarco) => {
        let {x,y} = getRandomPosValidaBarco(barco, orientacion)
        try {
            colocarBarco(x, y)
            return true
        } catch (error) {
            return false
        }
    }

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

    // cuando cambia el resultado del disparo, se actualiza el turno y el ganador si corresponde
    useEffect(() => {
        if (!resultadoDisparo) return
        if (resultadoDisparo.resultado !== RESULTADO_DISPARO.FIN)
            return setTurno(resultadoDisparo.turno === JUGADOR.LOCAL ? JUGADOR.PC : JUGADOR.LOCAL)

        setGanador(resultadoDisparo.turno)
        addToHistorial(resultadoDisparo.turno)
        setFase(FASE.FINALIZADA)
    }, [resultadoDisparo])

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

    // cuando sea el turno de la pc, dispara en una posicion random
    useEffect(() => {
        if (fase !== FASE.COMBATE || turno !== JUGADOR.PC) return
        const dispararRandom = (tableroMarcaRival) => {
            let posicionesValidas = tableroMarcaRival
                .map((fila, i) => fila.map((marca, j) => marca === ANOTADOR.VACIO ? {x: i, y: j} : null))
                .flat()
                .filter(pos => pos !== null)
            let posicionRandom = posicionesValidas[Math.floor(Math.random() * posicionesValidas.length)]
            dispararRival(posicionRandom.x, posicionRandom.y)
        }
        const timeout = setTimeout(() => {
            dispararRandom(tableroMarcaRival)
        }, 3000);

        return () => clearTimeout(timeout)
    }, [turno,fase])

    return (<div>
        <Alert message={error} setMessage={setError} error />
        <ResultadoDisparo resultadoDisparo={resultadoDisparo} setResultadoDisparo={setResultadoDisparo} turno={turno} />
        <Inicio iniciarPartida={iniciarPartida} historial={historial} fase={fase} clearHistorial={clearHistorial} />
        <DatosPartida fase={fase} turno={turno} ganador={ganador} />
        {fase === FASE.PREPARACION && <>
            <BotonListo listo={listo} fase={fase} jugador={JUGADOR.LOCAL} barcos={barcosLocal} turno={turno} />
            <SelectorBarco 
                barcos={barcosLocal}
                setBarcoSeleccionado={setBarcoSeleccionadoLocal}
                barcoSeleccionado={barcoSeleccionadoLocal} />
            <SelectorOrientacion orientacion={orientacion} setOrientacion={setOrientacion} />
        </>}
        <div className="tableros">
            {fase === FASE.COMBATE && <>
                <TableroDisparable
                    tablero={tableroMarcaLocal}
                    disparar={dispararLocal}
                    turno={turno}
                    jugador={JUGADOR.LOCAL}
                    />
            </>}
            {(fase === FASE.PREPARACION || fase === FASE.COMBATE) && 
                <TableroBarcos 
                    setError={setError}
                    colocarBarco={colocarBarcoLocal}
                    tableroBarcos={tableroBarcosLocal}
                    jugador={JUGADOR.LOCAL}
                    puedeColocarBarcos={puedeMoverColocarBarcos}
                    casillasEnLasQueSePodriaColocar={casillasEnLasQueSePodiraColocarLocal}
                    setTableroBarcos={setTableroBarcosLocal}
                    barcoSeleccionado={barcoSeleccionadoLocal}
                    />
            }
        </div>
        {fase === FASE.FINALIZADA && <>
            <button onClick={irAlInicio}>Volver al inicio</button>
        </>}
    </div>)
}

export default Partida