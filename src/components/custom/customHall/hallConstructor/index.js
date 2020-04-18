import React from 'react'
import { HallItem } from 'components/custom/customHall/hallItem'
import { useHallCellFetcher } from './hooks/useHallCellFetcher'

export const CustomHall = ({ structure, setHallStructure }) => {
  const hallCells = useHallCellFetcher()

  const MAX_LEVEL = hallCells.length
  const changePlaceLevel = (columnIndex, rowIndex, level) => {
    const levelUp = MAX_LEVEL === level ? 0 : level + 1
    setHallStructure((prev) => {
      return prev.map((column, prevColumnIndex) =>
        column.map((row, prevRowIndex) => {
          return prevColumnIndex === columnIndex && prevRowIndex === rowIndex ? levelUp : row
        })
      )
    })
  }

  const addRow = () => {
    setHallStructure((prev) => {
      const newRow = []
      newRow.length = prev[0].length
      newRow.fill(0)
      return [...prev, newRow]
    })
  }

  const addColumn = () => {
    setHallStructure((prev) => {
      const newRow = prev.map((el) => [...el, 0])
      return newRow
    })
  }

  return (
    <div>
      {hallCells.map((el) => (
        <div>
          {el.index} {el.name} {el.price}
        </div>
      ))}
      {
        <div>
          {structure.map((column, columnIndex) =>
            structure.length === columnIndex + 1 ? <div key={columnIndex}>-</div> : <div key={columnIndex}>0</div>
          )}
          <div onClick={() => addRow()}>+</div>
        </div>
      }
      {
        <div>
          {structure.map((column, columnIndex) =>
            column.map((row, rowIndex) => {
              if (columnIndex === 0) {
                return column.length === rowIndex + 1 ? <span key={rowIndex}>-</span> : <span key={rowIndex}>0</span>
              }
            })
          )}
          <span onClick={() => addColumn()}>+</span>
        </div>
      }
      <HallItem structure={structure} changePlaceLevel={changePlaceLevel} />
    </div>
  )
}
