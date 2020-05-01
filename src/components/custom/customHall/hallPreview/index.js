import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import VisibilityIcon from '@material-ui/icons/Visibility'

import { HallItem } from '../hallItem'

import './style.css'

export const HallPreview = ({ structure, hallCells, isMultiSelect = false }) => {
  const [preview, setPreview] = useState(false)

  return (
    <>
      <div className="hall-item-title" onClick={() => setPreview(true)}>
        SHOW PREVIEW
        <span className="hall-item-icon">
          <VisibilityIcon color="primary" />
        </span>
      </div>

      {preview && (
        <>
          <div onClick={() => setPreview(false)} className="dark-ground" />
          <div className="hall-item-preview-container">
            <div className="hall-item-button">
              <IconButton type="button" color="primary" onClick={() => setPreview(false)}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="hall-item-preview">
              <HallItem hallCells={hallCells} structure={structure} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
