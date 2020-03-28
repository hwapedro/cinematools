import React, { useState } from 'react'

export const CustomHall = ({ structure }) => {
  const [hallStructure, sethallStructure] = useState(
    structure
      ? structure
      : [
          [0, 1, 1, 1],
          [2, 2, 2, 2]
        ]
  )

  const MAX_LEVEL = 4
  const changePlaceLevel = (columnIndex, rowIndex, level) => {
    const levelUp = MAX_LEVEL === level ? 0 : level + 1
    sethallStructure(prev => {
      return prev.map((column, prevColumnIndex) =>
        column.map((row, prevRowIndex) => {
          return prevColumnIndex === columnIndex && prevRowIndex === rowIndex ? levelUp : row
        })
      )
    })
  }

  const addRow = () => {
    sethallStructure(prev => {
      const newRow = []
      newRow.length = prev[0].length
      newRow.fill(0)
      return [...prev, newRow]
    })
  }

  const hall = hallStructure.map((column, columnIndex) => {
    return (
      <div>
        {column.map((row, rowIndex) => (
          <>
            <span style={{ marginRight: '10px' }} onClick={() => changePlaceLevel(columnIndex, rowIndex, row)} key={rowIndex}>
              {row}
            </span>
          </>
        ))}
      </div>
    )
  })

  return (
    <div>
      {
        <div>
          {hallStructure.map((column, columnIndex) =>
            hallStructure.length === columnIndex + 1 ? <div key={columnIndex}>-</div> : <div key={columnIndex}>0</div>
          )}
          <div onClick={() => addRow()}>+</div>
        </div>
      }
      {
        <div>
          {hallStructure.map((column, columnIndex) =>
            column.map((row, rowIndex) => {
              if (columnIndex === 0) {
                return column.length === rowIndex + 1 ? <span key={rowIndex}>-</span> : <span key={rowIndex}>0</span>
              }
            })
          )}
          <span>+</span>
        </div>
      }
      {hall}
    </div>
  )
}
