import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'

import { useSmartFetcherPaginated } from './hooks/useSmartFetcherPaginated'
import { SmartConstructor } from '../smartConstructor'
import { GeneralItem } from './item'
import Button from 'components/shared/buttons'

export const GeneralPage = ({ model }) => {
  const limit = 2
  const { items, next, prev, page, hasMore, total } = useSmartFetcherPaginated({ model, limit })
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setEditMode(true)}>
        <AddIcon />
      </Fab>
      {items.map(item => (
        <GeneralItem item={item} key={item._id} model={model} />
      ))}
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
      {editMode && <SmartConstructor model={model} setEditMode={setEditMode} />}
    </div>
  )
}
