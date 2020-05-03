import React, { useState } from 'react'
import { MultiSelectItem } from './selectItem'

import './style.css'

export const MultiSelectList = ({ multiSelectList, item }) => {
  const [showElements] = useState(3)

  return (
    <div className="multiselect">
      {multiSelectList.map((fieldInModel) => {
        return (
          <div style={{marginTop: '10px'}}>
            <span className="multiselect-title">{fieldInModel.name}</span>
            {item &&
              item[fieldInModel.name].map((el, index) => {
                if (showElements > index) {
                  return <MultiSelectItem extractor={fieldInModel.extractor} itemsModelName={fieldInModel.name} item={el} modelId={item._id} />
                }
                return null
              })}
          </div>
        )
      })}
    </div>
  )
}
