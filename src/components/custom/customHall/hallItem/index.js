import React from 'react'


import './style.css'

export const HallItem = ({ structure, changePlaceLevel, hallCells }) => {

  const hall = structure.map((column, columnIndex) => {
    return (
      <div>
        {column.map((row, rowIndex) => (
          <>
            <span
              style={{ backgroundColor: row && hallCells ? hallCells[row - 1].color : '#d6d6d6' }}
              className={`hall-row-item`}
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
