import "./TableroDisparable.css"
import "./Tablero.css"
import ANOTADOR from "../model/Anotador"

const TableroDisparable = ({tablero, disparar, setResultadoDisparo}) => {

    const getColorCasilla = (casilla) => {
        if (casilla === ANOTADOR.AMARILLO) return "yellow"
        if (casilla === ANOTADOR.BLANCO) return "white"
        if (casilla === ANOTADOR.VACIO) return "gray"
    }

    const getClickeableClass = (casilla) => casilla === ANOTADOR.VACIO ? "clickeable" : ""

    const getCasillaClass = (casilla) => `${getColorCasilla(casilla)} casilla ${getClickeableClass(casilla)}`

    const handleDispararCasilla = (i, j) => {
        setResultadoDisparo({resultado: disparar(i,j), posicion: {x: i, y: j}})
    }

    return (
        <div>
            <h3>Tablero Disparable</h3>
            <div className="tablero">
                {tablero.map((fila, i) => (
                    fila.map((casilla, j) => (
                        <div key={j} className={getCasillaClass(casilla)} onClick={() => handleDispararCasilla(i,j)}></div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default TableroDisparable