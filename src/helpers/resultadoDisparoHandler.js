import { useEffect } from "react"
import RESULTADO_DISPARO from "../model/resultadoDisparo"
import JUGADOR from "../model/jugador"
import FASE from "../model/Fase"

const resultadoDisparoHandler = (resultadoDisparo, setTurno, setGanador, addToHistorial, setFase) => {
    // cuando cambia el resultado del disparo, se actualiza el turno y el ganador si corresponde
    useEffect(() => {
        if (!resultadoDisparo) return
        if (resultadoDisparo.resultado !== RESULTADO_DISPARO.FIN)
            return setTurno(resultadoDisparo.turno === JUGADOR.LOCAL ? JUGADOR.PC : JUGADOR.LOCAL)

        setGanador(resultadoDisparo.turno)
        addToHistorial(resultadoDisparo.turno)
        setFase(FASE.FINALIZADA)
    }, [resultadoDisparo])
 }

export default resultadoDisparoHandler