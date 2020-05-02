import React, { useState } from 'react'
import { MultiSelectItem } from './selectItem'

import './style.css'

export const MultiSelectList = ({ multiSelectList, item }) => {
  const [showElements, setShowElements] = useState(3)

  return (
    <div className="multiselect">
      {multiSelectList.map((fieldInModel) => {
        return (
          <div>
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
