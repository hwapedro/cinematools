import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import MuiAlert from '@material-ui/lab/Alert'

import { useSmartFetcherPaginated } from './hooks/useSmartFetcherPaginated'
import { useHallCellFetcher } from 'components/custom/customHall/hallConstructor/hooks/useHallCellFetcher'
import { SmartConstructor } from '../smartConstructor'
import { GeneralItem } from './item'
import { getLoading, getError } from 'store/smart/selectors'
import Button from 'components/shared/buttons'

import './styles.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const GeneralPage = ({ model }) => {
  const limit = 4
  const hallCells = useHallCellFetcher(model)
  const { items, next, prev, page, hasMore, total, setSkip } = useSmartFetcherPaginated({ model, limit })
  const [editMode, setEditMode] = useState(false)
  const loading = useSelector((state) => getLoading(state, model))
  const error = useSelector((state) => getError(state, model))

  return (
    <>
      {loading && <div className="content-loader" />}
      <div className="content-container">
        <div className={`main main-${model}`}>
          <span className={`main-title main-title-${model}`}>{model}</span>
          <Button className={`main-button main-button-${model}`} type="button" color="primary" text="add" onClick={() => setEditMode(true)} />
        </div>
        <div className={`container container-${model}`}>
          {items.map((item) => (
            <GeneralItem item={item} key={item._id} model={model} hallCells={hallCells} />
          ))}
          {!items.length && !loading && !error && <div className={`main-nothing main-nothing-${model}`}>nothing here yet, let's add {model}</div>}
        </div>
        {/* трыц тыц пагинатор */}
        <hr />
        <Box component="div" display="inline">
          <Button type="button" color="primary" text="<" disabled={page === 1} onClick={prev} />
          <span>
            {page} of {Math.ceil(total / limit)}
          </span>
          <Button type="button" color="primary" text=">" disabled={!hasMore} onClick={next} />
        </Box>
        <hr />
        {editMode && (
          <>
            <div className={`constructor-container constructor-container-${model}`}>
              <SmartConstructor resetPage={() => setSkip(0)} model={model} setEditMode={setEditMode} />
              <div className={`close-constructur close-constructur-${model}`}>
                <Fab onClick={() => setEditMode(false)} size="small" color="primary" aria-label="add">
                  <ChevronRightRoundedIcon />
                </Fab>
              </div>
            </div>
            <div onClick={() => setEditMode(false)} className={`dark-ground`}></div>
          </>
        )}
        {error && <Alert severity="error">{error.toString()} with {model}</Alert>}
      </div>
    </>
  )
}
