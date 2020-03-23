import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../../../shared/buttons'
import { ProductConstructor } from '../constructor'
import { deleteProduct } from '../../../../sagas/products/actions'

export const ShopItem = ({ product }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)

  const content = !editMode ? (
    <div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.inStock ? 'in stock' : 'not in stock'}</div>
      <div>
        <Button color="primary" text="edit" onClick={() => setEditMode(true)} />
        <Button color="secondary" text="delete" onClick={() => dispatch(deleteProduct(product._id))} />
      </div>
    </div>
  ) : (
    <ProductConstructor product={product} setEditMode={setEditMode} mode="CHANGE" />
  )

  return content
}
