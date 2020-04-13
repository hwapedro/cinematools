import React from 'react'
import { MultiSelectList } from '../selectList'
import { CustomMultiselectItem } from './selectConstructorItem'
import './smartMultiselectEditor.css'

export const CustomMultiselect = ({ itemsModel, item, ...props }) => {
  console.log(props)

  return (
    <>
      <MultiSelectList multiSelectList={itemsModel} item={item} />
      {itemsModel.map((el) => (
        <CustomMultiselectItem itemsModel={el.model} itemsModelName={el.name} {...props} />
      ))}
    </>
  )
}
