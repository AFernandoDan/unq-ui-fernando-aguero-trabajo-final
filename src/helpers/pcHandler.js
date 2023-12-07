import { useEffect } from "react"
import FASE from "../model/Fase"
import ORIENTACION from "../model/Orientacion"
import JUGADOR from "../model/jugador"

const getOrientacionRandom = () => Math.floor(Math.random() * 2) === 0 ? ORIENTACION.HORIZONTAL : ORIENTACION.VERTICAL

const getRandomPosValidaBarco = (barco, orientacion) => {
    let maxdDelLadoOrientado = Math.floor(Math.random() * (9 - barco.longitud))
    let maxdDelLadoNoOrientado = Math.floor(Math.random() * 10)

    return orientacion === ORIENTACION.HORIZONTAL 
        ? {x: Math.floor(maxdDelLadoOrientado), y: Math.floor(maxdDelLadoNoOrientado)} 
        : {x: Math.floor(maxdDelLadoNoOrientado), y: Math.floor(maxdDelLadoOrientado)}
}


const handleSiguienteBarco = (barcos, setBarcoSeleccionado) => {
    // cuando se coloca un barco, se selecciona el siguiente barco
    useEffect(() => {
        if (barcos && barcos.some(barco => !barco.colocado)) {
            setBarcoSeleccionado(barcos.find(barco => !barco.colocado))
        }
    }, [barcos])
}

const handleColocarBarco = (tableroBarcos, barcos, fase, setOrientacion, colocarBarco, barcoSeleccionado) => {
        // cuando se selecciona un barco, se intenta colocar en una posicion random
        useEffect(() => {
            if (tableroBarcos && barcos && fase === FASE.PREPARACION && barcos.some(barco => !barco.colocado)) {
                const colocarBarcoRandom = (colocarBarco, setOrientacion) => {
                    let seColoco = false
                    while (!seColoco) {
                        let orientacion = getOrientacionRandom()
                        setOrientacion(orientacion)
                        let {x,y} = getRandomPosValidaBarco(barcoSeleccionado, orientacion)
                        try {
                            colocarBarco(x,y)
                            seColoco = true
                        } catch (error) {
                            seColoco = false
                        }
                    }
                }
    
                const timeout = setTimeout(() => {
                    colocarBarcoRandom(colocarBarco, setOrientacion)
                }, Math.floor(Math.random() * 7) + 3000);
                return () => clearTimeout(timeout)
            }
        }, [barcoSeleccionado, colocarBarco, setOrientacion])
}

const handleEstaListo = (barcos, fase, listo, jugador) => {
        // cuando la partida esta en preparacion la pc espera de 15s a 60s para poner listo
        useEffect(() => {
            if (fase !== FASE.PREPARACION || !barcos || barcos.some(barco => !barco.colocado)) return
            listo(barcos, jugador)
    }, [fase, barcos])
}

const handleDispararRandom = (fase, turno, disparar, tableroRival) => {
       // cuando sea el turno de la pc, dispara en una posicion random
       useEffect(() => {
        if (fase !== FASE.COMBATE || turno !== JUGADOR.PC) return
        const dispararRandom = (tableroRival) => {
            let posicionesValidas = tableroRival
                .map((fila, i) => fila.map((casilla, j) => !casilla.tocado ? {x: i, y: j} : null))
                .flat()
                .filter(pos => pos !== null)
            let posicionRandom = posicionesValidas[Math.floor(Math.random() * posicionesValidas.length)]
            disparar(posicionRandom.x, posicionRandom.y)
        }
        const timeout = setTimeout(() => {
            dispararRandom(tableroRival)
        }, 1000);

        return () => clearTimeout(timeout)
    }, [turno,fase])
}
    

export { handleSiguienteBarco, handleColocarBarco, handleEstaListo , handleDispararRandom }