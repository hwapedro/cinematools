import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Checkbox } from '@material-ui/core/'

import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { changeProduct, addProduct } from '../../../../sagas/products/actions'

export const ProductConstructor = ({ product, setEditMode, mode }) => {
  const dispatch = useDispatch()
  const [productName, setProductName] = useState(product ? product.name : '')
  const [productPrice, setProductPrice] = useState(product ? product.price : '')
  const [isInStock, setInStock] = useState(product ? product.inStock : true)

  const resetForm = () => {
    setInStock(product ? product.inStock : true)
    setProductPrice(product ? product.price : '')
    setProductName(product ? product.name : '')
    setEditMode(false)
  }

  return (
    <div>
      <TextField name="name" label="name" value={productName} onChange={e => setProductName(e.currentTarget.value)} />
      <TextField name="price" label="price" type="number" value={productPrice} onChange={e => setProductPrice(e.currentTarget.value)} />
      <div>
        <Checkbox color="primary" checked={isInStock} onClick={() => setInStock(isInStock => !isInStock)} />
        {mode === 'ADD' ? (
          <Button
            color="primary"
            text="add"
            onClick={() => {
              dispatch(addProduct(productName, productPrice, isInStock))
              setEditMode(false)
            }}
          />
        ) : (
            <Button
              color="primary"
              text="save"
              onClick={() => {
                dispatch(changeProduct(product._id, productName, productPrice, isInStock))
                setEditMode(false)
              }}
            />
          )}

        <Button color="primary" text="cancel" onClick={() => resetForm()} />
      </div>
    </div>
  )
}
