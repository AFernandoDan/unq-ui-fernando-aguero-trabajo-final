import "./TableroDisparable.css"
import "./Tablero.css"
import ANOTADOR from "../model/Anotador"

const getColorCasilla = (casilla, turno, jugador) => {
    if (casilla === ANOTADOR.AMARILLO) return "yellow"
    if (casilla === ANOTADOR.BLANCO) return "white"
    if (casilla === ANOTADOR.VACIO) return "gray"
}

const getClickeableClass = (casilla, puedeDisparar) => casilla === ANOTADOR.VACIO && puedeDisparar ? "clickeable" : ""

const getCasillaClass = (casilla) => `${getColorCasilla(casilla)} casilla ${getClickeableClass(casilla)}`

const TableroDisparable = ({tablero, disparar, turno, jugador}) => {

    const handleDispararCasilla = (i, j) => {
        disparar(i, j)
    }

    const puedeDisparar = turno === jugador

    return (
        <div>
            <h3>Tablero Disparable</h3>
            <div className="tablero">
                {tablero.map((fila, i) => (
                    fila.map((casilla, j) => (
                        <div key={j} className={getCasillaClass(casilla, puedeDisparar)} onClick={() => handleDispararCasilla(i,j)}></div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default TableroDisparable