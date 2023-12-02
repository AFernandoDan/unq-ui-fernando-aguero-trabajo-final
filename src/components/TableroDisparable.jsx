import "./TableroDisparable.css"
import "./Tablero.css"
import ANOTADOR from "../model/Anotador"

const getColorCasilla = (casilla) => {
    if (casilla === ANOTADOR.AMARILLO) return "yellow"
    if (casilla === ANOTADOR.BLANCO) return "white"
    if (casilla === ANOTADOR.VACIO) return "gray"
}

const puedeDisparar = (casilla, turno, jugador) => casilla === ANOTADOR.VACIO && turno === jugador

const getClickeableClass = (casilla, turno, jugador) => puedeDisparar(casilla, turno, jugador) ? "clickeable" : ""

const getCasillaClass = (casilla, turno, jugador) => `${getColorCasilla(casilla)} casilla ${getClickeableClass(casilla, turno, jugador)}`

const TableroDisparable = ({tablero, disparar, turno, jugador}) => {

    const handleDispararCasilla = (i, j) => {
        disparar(i, j)
    }

    return (
        <div>
            <h3>Tus disparos</h3>
            <div className="tablero">
                {tablero.map((fila, i) => (
                    fila.map((casilla, j) => (
                        <div key={j} className={getCasillaClass(casilla, turno, jugador)} onClick={() => handleDispararCasilla(i,j)}></div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default TableroDisparable