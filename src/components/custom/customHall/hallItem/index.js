import React from 'react'

import './style.css'

export const HallItem = ({ structure, changePlaceLevel, hallCells }) => {
  console.log(hallCells)
  const hall = structure.map((column, columnIndex) => {
    return (
      <div>
        {column.map((row, rowIndex) => (
          <>
            <span
              style={{ backgroundColor: row && hallCells && hallCells[row - 1].color }}
              className={`hall-row-item ${!row ? 'hall-empty-place' : ''}`}
              onClick={changePlaceLevel ? () => changePlaceLevel(columnIndex, rowIndex, row) : null}
              key={rowIndex}
            ></span>
          </>
        ))}
      </div>
    )
  })

  return <div>{hall}</div>
}
