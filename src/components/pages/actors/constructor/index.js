import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { changeActor, addActor } from '../../../../sagas/actors/actions'

export const ActorConstructor = ({ actor, setEditMode, mode }) => {
  const dispatch = useDispatch()
  const [actorName, setActorName] = useState(actor ? actor.name : '')
  const [actorBio, setActorBio] = useState(actor ? actor.bio : '')

  const resetForm = () => {
    setActorBio(actor ? actor.bio : '')
    setActorName(actor ? actor.name : '')
    setEditMode(false)
  }

  return (
    <div>
      <TextField name="name" label="name" value={actorName} onChange={e => setActorName(e.currentTarget.value)} />
      <TextField
        name="bio"
        label="bio"
        type="number"
        value={actorBio}
        onChange={e => setActorBio(e.currentTarget.value)}
        multiline
        rows={2}
        rowsMax={4}
      />
      <div>
        {mode === 'ADD' ? (
          <Button
            color="primary"
            text="add"
            onClick={() => {
              dispatch(addActor(actorName, actorBio))
              setEditMode(false)
            }}
          />
        ) : (
          <Button
            color="primary"
            text="save"
            onClick={() => {
              dispatch(changeActor(actor._id, actorName, actorBio))
              setEditMode(false)
            }}
          />
        )}

        <Button color="primary" text="cancel" onClick={() => resetForm()} />
      </div>
    </div>
  )
}
