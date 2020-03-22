import React, { useState } from 'react'
import { useProductsFetcher } from './hooks/useProductsFetcher'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { ShopItem } from './shopItem'
import { ProductConstructor } from './constructor'

export const Products = () => {
  const products = useProductsFetcher()
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setEditMode(true)}>
        <AddIcon />
      </Fab>
      {products.map(product => (
        <ShopItem key={product._id} product={product} />
      ))}
      {editMode && <ProductConstructor setEditMode={setEditMode} mode="ADD" />}
    </div>
  )
}
