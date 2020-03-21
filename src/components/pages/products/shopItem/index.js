import React, { useState } from 'react'
import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { Checkbox } from '@material-ui/core/'
import { changeProduct } from '../../../../sagas/products/actions'
import { useDispatch } from 'react-redux'

export const ShopItem = ({ product }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(0)
  const [productName, setProductName] = useState(product.name)
  const [productPrice, setProductPrice] = useState(product.price)
  const [isInStock, setInStock] = useState(product.inStock)

  const onChangeHandler = (setInput, e) => {
    console.log(e, setInput)
    setInput(e.currentTarget.value)
  }

  const content = !editMode ? (
    <div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.inStock ? 'in stock' : 'not in stock'}</div>
      <div>
        <Button color="primary" text="edit" onClick={() => setEditMode(true)} />

        <Button color="secondary" text="delete" onClick={editMode => setEditMode(!editMode)} />
      </div>
    </div>
  ) : (
    <div>
      <TextField name="name" label="name" value={productName} onChange={e => setProductName(e.currentTarget.value)} />
      <TextField name="price" label="price" type="number" value={productPrice} onChange={e => setProductPrice(e.currentTarget.value)} />
      <div>
        <Checkbox color="primary" checked={isInStock} onClick={() => setInStock(isInStock => !isInStock)} />
        <Button color="primary" text="edit" onClick={() => dispatch(changeProduct(product._id, productName, productPrice, isInStock))} />
        <Button color="primary" text="cancel" onClick={() => setEditMode(false)} />
      </div>
    </div>
  )

  return content
}
