import React from 'react'

import './style.css'

export const HallItem = ({ structure, changePlaceLevel }) => {
  console.log(structure)
  const hall = structure.map((column, columnIndex) => {
    return (
      <div>
        {column.map((row, rowIndex) => (
          <>
            <span
              
              className={`hall-row-item ${!row ? 'hall-empty-place' : ''}`}
              onClick={changePlaceLevel ? () => changePlaceLevel(columnIndex, rowIndex, row) : null}
              key={rowIndex}
            >
          
            </span>
          </>
        ))}
      </div>
    )
  })

  return <div>{hall}</div>
}
