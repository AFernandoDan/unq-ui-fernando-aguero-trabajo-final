import TableroBarcos from "./tableroBarcos";
import TableroMarcable from "./tableroMarcable";
import Barco from "./barco";

class Jugador {
    constructor (partida) {
        this.tableroBarcos = new TableroBarcos();
        this.tableroMarcable = new TableroMarcable();
        this.partida = partida;
        this.marcadoresAmarillos = 72;
        this.marcadoresBlancos = 169;
        this.barcosPorColocar = new Set();
        inicializarBarcosPorColocar();
    }

    inicializarBarcosPorColocar () {
        this.barcosPorColocar.add(Barco.getPortaaviones());
        this.barcosPorColocar.add(Barco.crucero());
        this.barcosPorColocar.add(Barco.submarino());
        this.barcosPorColocar.add(Barco.lanchaTorpedera());
    }

    colocarBarco (barco, posicion) {
        this.tableroBarcos.colocarBarco(barco, posicion, orientacion);
    }

    disparar (posicion) {
        return this.partida.disparar(posicion, this);
    }

    recibirDisparo (posicion) {
        return this.tableroBarcos.recibirDisparo(posicion);
    }

    errorSiNoPuedeMarcar () {
        if (this.marcadoresAmarillos === 0) throw new Error("No quedan marcadores amarillos");
        if (this.marcadoresBlancos === 0) throw new Error("No quedan marcadores blancos");
    }

    reemplazarMarcador (anotadorNuevo, anotadorAnterior) {
        if (anotadorAnterior === ANOTADOR.AMARILLO) {
            this.marcadoresAmarillos++;
        } else if (anotadorAnterior === ANOTADOR.BLANCO) {
            this.marcadoresBlancos++;
        }

        if (anotadorNuevo === ANOTADOR.AMARILLO) {
            this.marcadoresAmarillos--;
        } else if (anotadorNuevo === ANOTADOR.BLANCO) {
            this.marcadoresBlancos--;
        }
    }

    marcar (posicion, anotador) {
        errorSiNoPuedeMarcar();
        this.tableroMarcable.marcar(posicion, anotador, this);
    }
}

export default Jugador;