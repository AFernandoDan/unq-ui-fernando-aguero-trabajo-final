import FASE from "../model/Fase"
import JUGADOR from "../model/jugador"

const splashesGanador = [
  "Domando a la pc",
  "Ez win",
  "Sos buenisimo hermano",
  "Sos un capo",
  "Quien pudiera ser tan bueno",
]

const splashesPerdedor = [
  "Sos malisimo",
  "Te gano una pc jaja",
  "Retirate del juego",
  "Desinstala el juego",
  "La habilidad te persigue pero vos sos mas rapido",
  "PC DIFF"
]

const splashesEmpate = [
  "Esta peleada la cosa",
  "Digno rival para la maquina",
  "Esta muy pareja la cosa",
]

const getFraseRandom = (diff) => {
  if (diff > 0) return splashesGanador[Math.floor(Math.random() * splashesGanador.length)]
  if (diff < 0) return splashesPerdedor[Math.floor(Math.random() * splashesPerdedor.length)]
  return splashesEmpate[Math.floor(Math.random() * splashesEmpate.length)]
}


const Inicio = ({setFase, historial, fase, clearHistorial}) => {
  if (fase !== FASE.IDLE) return null

  const diff = historial[JUGADOR.LOCAL] - historial[JUGADOR.PC]

  return (
    <div>
        <button onClick={() => setFase(FASE.PREPARACION)}>Iniciar partida</button>
        <h2>Historial</h2>
        <p>Tu: {historial[JUGADOR.LOCAL]}</p>
        <p>La PC: {historial[JUGADOR.PC]}</p>
        <p>Diff: {diff}</p>
        <p>
          <i>{getFraseRandom(diff)}</i>
        </p>
        <button onClick={clearHistorial}>Limpiar historial</button>
    </div>
  )
}

export default Inicio