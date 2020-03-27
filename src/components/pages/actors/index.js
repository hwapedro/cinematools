import React, { useState } from 'react'
import { useActorsFetcher } from './hooks/useActorsFetcher'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { ShopItem } from './actor'
import { SmartConstructor } from '../../shared/smart/smartConstructor'

export const Actors = () => {
  const actors = useActorsFetcher()
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setEditMode(true)}>
        <AddIcon />
      </Fab>
      {actors.map(actor => (
        <ShopItem key={actor._id} actor={actor} />
      ))}
      {editMode && <SmartConstructor model="actors" setEditMode={setEditMode} />}
    </div>
  )
}
