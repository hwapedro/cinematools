import React from 'react'

export const HallItem = ({ structure, changePlaceLevel }) => {
  console.log(structure)
  const hall = structure.map((column, columnIndex) => {
    return (
      <div>
        {column.map((row, rowIndex) => (
          <>
            <span
              style={{ marginRight: '10px' }}
              onClick={changePlaceLevel ? () => changePlaceLevel(columnIndex, rowIndex, row) : null}
              key={rowIndex}
            >
              {row}
            </span>
          </>
        ))}
      </div>
    )
  })

  return <div>{hall}</div>
}
