import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles';

import { HallItem } from 'components/custom/customHall/hallItem'
import { useHallCellFetcher } from './hooks/useHallCellFetcher'

import './style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },

}));

export const CustomHall = ({ structure, setHallStructure }) => {
  const hallCells = useHallCellFetcher('halls')
  const classes = useStyles();

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
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>color info</Typography>
        </ExpansionPanelSummary>

        {hallCells.map((el) => (
          <ExpansionPanelDetails>
            <div className="info-hall-cell-container">
              <span style={{ backgroundColor: el.color }} className="info-hall-cell-color"></span>{' '}
              <span className="info-hall-cell-name">{el.name}</span> {el.price}
            </div>
          </ExpansionPanelDetails>
        ))}
      </ExpansionPanel>

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
      <HallItem structure={structure} hallCells={hallCells} changePlaceLevel={changePlaceLevel} />
    </div>
  )
}
