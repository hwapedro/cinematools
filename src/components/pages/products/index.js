import React from 'react'
import { useProductsFetcher } from './hooks/useProductsFetcher'

import { ShopItem } from './shopItem'

export const Products = () => {
  const products = useProductsFetcher()

  return (
    <div>
      {products.map(product => (
        <ShopItem key={product._id} product={product} />
      ))}
    </div>
  )
}
