import React from 'react'
import "./Tablero.css"

const TableroContainer = ({children}) => {
  return (
    <div className="tablero-container">
        <div className="numeros">
            {[1,2,3,4,5,6,7,8,9, 10].map((numero) => <p key={numero}>{numero}</p>)}
        </div>
        <div className="letras">
            {["A","B","C","D","E","F","G","H","I", "J"].map((letra) => <p key={letra}>{letra}</p>)}
        </div>
        {children}
    </div>
  )
}

export default TableroContainer