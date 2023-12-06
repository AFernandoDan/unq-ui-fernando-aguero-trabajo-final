import { useState } from 'react'
import './App.css'
import Partida from './components/Partida'
import Inicio from './components/Inicio'
import FASE from './model/Fase'
import useHistorial from './hooks/useHistorial'

function App() {
  const [fase, setFase] = useState(FASE.IDLE)
  const {historial, addToHistorial, clearHistorial} = useHistorial()

  return (
    <>
      <main>
        <h1>⚓ BATALLA NAVAL ⚓</h1>
          <Inicio setFase={setFase} historial={historial} fase={fase} clearHistorial={clearHistorial} />
          {fase !== FASE.IDLE && <Partida fase={fase} setFase={setFase} addToHistorial={addToHistorial} />}
      </main>
    </>
  )
}

export default App
