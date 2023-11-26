import FASE from "./fase.js";
import

class Partida {
    
    constructor () {
        this.jugador1 = new Jugador(partida);
        this.jugador2 = new Jugador(partida);
        this.fase = FASE.PREPARACION;
        this.jugadorTurno = this.jugador1;
        this.ganador = null;
    }

    cambiarTurno() {
        if (this.jugadorTurno === this.jugador1) {
            this.jugadorTurno = this.jugador2;
        } else {
            this.jugadorTurno = this.jugador1;
        }
    }

    sePuedeEmpezar() {
        return this.fase === FASE.PREPARACION &&
            this.jugador1.tableroBarcos.estaPreparado() &&
            this.jugador2.tableroBarcos.estaPreparado();
    }

    comenzarPartida(jugador) {
        if (sePuedeEmpezar()) {
            this.fase = FASE.COMBATE;
            this.jugadorTurno = jugador;
        }
    }

    finalizarPartida(jugador) {
        this.fase = FASE.FINALIZADA;
        this.ganador = jugador;
    }

    estaEnCombate() {
        return this.fase === FASE.COMBATE;
    }

    disparar(posicion, jugador) {
        if (!this.esTurnoDe(jugador)) throw new Error("No es el turno del jugador");
        if (!this.estaEnCombate()) throw new Error("La partida no ha empezado o ya ha finalizado");

        const jugadorEnemigo = jugador === this.jugador1 ? this.jugador2 : this.jugador1;
        const resultado = jugadorEnemigo.recibirDisparo(posicion);
        if (resultado === RESULTADO_DISPARO.FIN) {
            this.finalizarPartida(jugador);
        }
    }

    esTurnoDe(jugador) {
        return this.jugadorTurno === jugador;
    }
}