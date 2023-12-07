import TableroDisparable from "./TableroDisparable"
import JUGADOR from "../model/jugador"
import FASE from "../model/Fase"
import TableroBarcos from "./TableroBarcos"
import SelectorBarco from "./SelectorBarco"
import SelectorOrientacion from "./SelectorOrientacion"
import BotonListo from "./BotonListo"
import DatosPartida from "./DatosPartida"
import BotonIrAlInicio from "./BotonIrAlInicio"
import partida from "../helpers/partida"

const Partida = ({fase,setFase, addToHistorial}) => {
    
    const [jugador, ganador, turno, resultadoDisparo, setResultadoDisparo, listo] = partida(fase, setFase, addToHistorial)

    const [
        tableroBarcos, 
        setTableroBarcos, 
        colocarBarco, 
        barcos, 
        barcoSeleccionado, 
        setBarcoSeleccionado, 
        orientacion, 
        setOrientacion,
        casillasEnLasQueSePodiraColocar,
        disparar,
        tableroBarcosRival,
        puedeMoverColocarBarcos
    ] = jugador

    return (<div>
        <DatosPartida fase={fase} turno={turno} ganador={ganador} />
        {fase === FASE.PREPARACION && <>
            <BotonListo listo={listo} fase={fase} jugador={JUGADOR.LOCAL} barcos={barcos} turno={turno} />
            <SelectorBarco barcos={barcos} setBarcoSeleccionado={setBarcoSeleccionado} barcoSeleccionado={barcoSeleccionado} />
            <SelectorOrientacion orientacion={orientacion} setOrientacion={setOrientacion} />
        </>}
        <div className="tableros">
            <TableroDisparable
                fase={fase}
                tablero={tableroBarcosRival}
                disparar={disparar}
                turno={turno}
                jugador={JUGADOR.LOCAL}
                />
            <TableroBarcos
                fase={fase}
                colocarBarco={colocarBarco}
                tableroBarcos={tableroBarcos}
                jugador={JUGADOR.LOCAL}
                puedeColocarBarcos={puedeMoverColocarBarcos}
                casillasEnLasQueSePodriaColocar={casillasEnLasQueSePodiraColocar}
                setTableroBarcos={setTableroBarcos}
                barcoSeleccionado={barcoSeleccionado}
                />
        </div>
        <BotonIrAlInicio fase={fase} setFase={setFase} />
    </div>)
}

export default Partida