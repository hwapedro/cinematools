import React, { useState } from 'react'
import { useActorsFetcher } from './hooks/useActorsFetcher'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { ShopItem } from './actor'
import { ActorConstructor } from './constructor'

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
      {editMode && <ActorConstructor setEditMode={setEditMode} mode="ADD" />}
    </div>
  )
}
