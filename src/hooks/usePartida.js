import Partida from "../model/Partida";

const usePartida = () => {
    const [partida, setPartida] = useState(new Partida);

    const reiniciarPartida = setPartida(new Partida);

    return partida;
}

export default usePartida;