class TableroMarcable {
    constructor () {
        this.tablero = Array(10).fill(Array(10).fill(null));
    }

    marcar (posicion, anotador, Jugador) {
        this.tablero[posicion.x][posicion.y] = anotador;
        Jugador.reemplazarMarcador(anotador, this.tablero[posicion.x][posicion.y]);
    }
}