import React from 'react'
import "./Barco.css"

const baseClass = "radio-barco "

const getClassNameB = (barco) => `${baseClass}${barco.tipoBarco.toLowerCase()}`

const SelectorBarco = ({barcos, barcoSeleccionado, setBarcoSeleccionado}) => {
  return (
    <div>
      <h3>Selecciona un barco:</h3>
      {barcos.map((barco, index) => (
        <label key={index} className={getClassNameB(barco)}>
          <input
            type="radio"
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