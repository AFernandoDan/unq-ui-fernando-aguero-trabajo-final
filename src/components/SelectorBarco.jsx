import React from 'react'

const SelectorBarco = ({barcos, barcoSeleccionado, setBarcoSeleccionado}) => {
  return (
    <div>
      <h3>Selecciona un barco:</h3>
      {barcos.map((barco, index) => (
        <label key={index}>
          <input
            type="radio"
            value={barco}
            checked={barcoSeleccionado === barco}
            onChange={() => setBarcoSeleccionado(barco)}
          />
          {barco.tipoBarco}
        </label>
      ))}
    </div>
  )
}

export default SelectorBarco