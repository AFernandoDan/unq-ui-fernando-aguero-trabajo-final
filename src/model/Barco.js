import ORITENTACION from "./orientacion";
import RESULTADO_DISPARO from "./resultadoDisparo";

class Barco {
    constructor(nombre,tamanio) {
        this.tamanio = tamanio;
        this.posicion = null;
        this.orientacion = null;
        this.tocado = Array(tamanio).fill(false);
        this.nombre = nombre;
    }

    static getPortaaviones() {
        return new Barco("Portaaviones",4);
    }

    static getCrucero() {
        return new Barco("Crucero",4);
    }

    static getSubmarino() {
        return new Barco("Submarino",4);
    }

    static getLanchaTorpedera() {
        return new Barco("Lancha Torpedera",2);
    }

    recibirDisparo(posicion) {
        if (!this.estaColocado())
            throw new Error("El barco no está colocado");
        const {x, y} = posicion;

        let resultado = RESULTADO_DISPARO.AGUA;

        if (this.orientacion === ORIENTACION.HORIZONTAL)
            resultado = this.recibirDisparoHorizontal(x, y);
        if (this.orientacion === ORITENTACION.VERTICAL)
            resultado = this.recibirDisparoVertical(x, y);

        return resultado;
    }

    colocar(posicion, orientacion) {
        this.posicion = posicion;
        this.orientacion = orientacion;
    }

    estaColocado() {
        return this.posicion !== null && this.orientacion !== null;
    }

    estaHundido() {
        return this.tocado.every(t => t);
    }

    recibirDisparoHorizontal(x, y) {
        if (y !== this.posicion.y)
            return RESULTADO_DISPARO.AGUA;

        const distancia = x - this.posicion.x;
        if (distancia < 0 || distancia >= this.tamanio)
            return RESULTADO_DISPARO.AGUA;

        this.tocado[distancia] = true;

        if (this.estaHundido()) {
            return RESULTADO_DISPARO.HUNDIDO;
        }

        return RESULTADO_DISPARO.TOCADO;
    }
}