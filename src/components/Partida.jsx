import usePartida from "../hooks/usePartida"

const Partida = () => {
    const [partida, reiniciarPartida] = usePartida(partida)
    return (
        <div>Patida {partida.fase}</div>
    )
}

export default Partida