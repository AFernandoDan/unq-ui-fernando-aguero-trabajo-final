import "./TableroDisparable.css"
import "./Tablero.css"
import ANOTADOR from "../model/Anotador"
import TableroContainer from "./TableroContainer"
import FASE from "../model/Fase"

const getColorCasilla = (casilla) => {
    if (casilla === ANOTADOR.AMARILLO) return "yellow"
    if (casilla === ANOTADOR.BLANCO) return "white"
    if (casilla === ANOTADOR.VACIO) return "gray"
}

const puedeDisparar = (casilla, turno, jugador) => casilla === ANOTADOR.VACIO && turno === jugador

const getClickeableClass = (casilla, turno, jugador) => puedeDisparar(casilla, turno, jugador) ? "clickeable" : ""

const getCasillaClass = (casilla, turno, jugador) => `${getColorCasilla(casilla)} casilla ${getClickeableClass(casilla, turno, jugador)}`

const TableroDisparable = ({tablero, disparar, turno, jugador, fase}) => {

    const handleDispararCasilla = (i, j) => {
        disparar(i, j)
    }

    if (fase !== FASE.COMBATE) return null

    return (
        <div>
            <h3>Tus disparos</h3>
            <TableroContainer>
                <div className="tablero">
                    {tablero.map((fila, i) => (
                        fila.map((casilla, j) => (
                            <div key={j} className={getCasillaClass(casilla, turno, jugador)} onClick={() => handleDispararCasilla(i,j)}></div>
                        ))
                    ))}
                </div>
            </TableroContainer>
        </div>
    )
}

export default TableroDisparable