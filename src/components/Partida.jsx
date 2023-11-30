import TableroDisparable from "./TableroDisparable"
import JUGADOR from "../model/jugador"
import { useState } from "react"
import FASE from "../model/Fase"
import ResultadoDisparo from "./ResultadoDisparo"
import TableroBarcos from "./TableroBarcos"
import SelectorBarco from "./SelectorBarco"
import SelectorOrientacion from "./SelectorOrientacion"
import Alert from "./Alert"
import BotonListo from "./BotonListo"
import useTableroDisparable from "../hooks/useTableroDisparable"
import useTableroBarcos from "../hooks/useTableroBarcos"



const Partida = () => {
    const [ganador, setGanador] = useState(null)
    const [turno, setTurno] = useState(JUGADOR.LOCAL)
    const [resultadoDisparo, setResultadoDisparo] = useState(null)
    const [fase, setFase] = useState(FASE.PREPARACION)
    const [error, setError] = useState(null)

    const [
        colocarBarcoLocal, 
        tableroBarcosLocal,
        setTableroBarcosLocal,
        barcosLocal, 
        barcoSeleccionadoLocal, 
        setBarcoSeleccionadoLocal, 
        orientacion, 
        setOrientacion] 
        = useTableroBarcos()

    const {
        colocarBarcoRival, 
        tableroBarcosRival, 
        setTableroBarcosRival,
        barcosRival, 
        barcoSeleccionadoRival, 
        setBarcoSeleccionadoRival, 
        orientacionRival, 
        setOrientacionRival
    } = useTableroBarcos()

    const {tablero: tableroMarcaLocal, disparar: dispararLocal} = useTableroDisparable(tableroBarcosLocal, setTableroBarcosLocal)
    const {tablero: tableroMarcaRival, disparar: dispararRival} = useTableroDisparable(tableroBarcosLocal, setTableroBarcosLocal)

    return (<div>
        <h2>Partida: {fase}</h2>
        <div>Tablero Marcable Jugador 1</div>
        <Alert message={error} setMessage={setError} error />
        <ResultadoDisparo resultadoDisparo={resultadoDisparo} setResultadoDisparo={setResultadoDisparo} />
        <TableroDisparable
            tablero={tableroMarcaLocal}
            disparar={dispararLocal}
            setResultadoDisparo={setResultadoDisparo}
            />
        <SelectorBarco 
            barcos={barcosLocal}
            setBarcoSeleccionado={setBarcoSeleccionadoLocal}
            barcoSeleccionado={barcoSeleccionadoLocal} />
        <SelectorOrientacion orientacion={orientacion} setOrientacion={setOrientacion} />
        <BotonListo barcos={barcosLocal} setFase={setFase} fase={fase} />
        <TableroBarcos 
            setError={setError}
            colocarBarco={colocarBarcoLocal}
            tableroBarcos={tableroBarcosLocal}
            />
    </div>)
}

export default Partida