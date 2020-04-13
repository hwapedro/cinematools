import React from 'react'
import { MultiSelectItem } from './selectItem'

export const MultiSelectList = ({ multiSelectList, item }) => {
  return (
    <>
      {multiSelectList.map((fieldInModel) => {
        return (
          <>
            <span>{fieldInModel.name}</span>
            {item[fieldInModel.name].map((el) => {
              return <MultiSelectItem extractor={fieldInModel.extractor} itemsModelName={fieldInModel.name} item={el} />
            })}
          </>
        )
      })}
    </>
  )
}
