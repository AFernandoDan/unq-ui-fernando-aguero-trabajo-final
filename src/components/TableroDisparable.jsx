import "./TableroDisparable.css"
import "./Tablero.css"
import TableroContainer from "./TableroContainer"
import FASE from "../model/Fase"
import TIPO_CASILLA from "../model/tipoCasilla"

const getColorCasilla = (casilla) => {
    if (!casilla.tocado) return "casilla-sin-disparar"
    if (casilla.tipoCasilla === TIPO_CASILLA.BARCO && casilla.hundido) return "casilla-barco-hundido"
    if (casilla.tipoCasilla === TIPO_CASILLA.BARCO) return "casilla-barco-tocado"
    if (casilla.tipoCasilla === TIPO_CASILLA.AGUA) return "casilla-nada"
}

const puedeDisparar = (casilla, turno, jugador) => !casilla.tocado && turno === jugador

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