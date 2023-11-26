import RESULTADO_DISPARO from "./resultadoDisparo.js";

class TableroBarcos {
    constructor () {
        this.barcos = [];
        this.tamanio = 10;
    }

    colocarBarco (barco, posicion, orientacion) {
        barco.colocar(posicion, orientacion);
        this.barcos.push(barco);
    }

    estaDentroDeLimites (posicion) {
        return posicion.x >= 0 && posicion.x < this.tamanio &&
            posicion.y >= 0 && posicion.y < this.tamanio;
    }

    recibirDisparo (posicion) {
        if (!this.estaDentroDeLimites(posicion))
            throw new Error("La posición está fuera de los límites del tablero");

        return this.barcos.reduce((resultado, barco) => {
                return resultado || barco.barco.recibirDisparo(posicion);
        }, RESULTADO_DISPARO.AGUA);
    }
}