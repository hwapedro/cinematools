import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProducts } from '../../../../sagas/products/actions'
import { getProducts } from '../../../../sagas/products/selectors'

export const useProductsFetcher = () => {
  const dispatch = useDispatch()
  const products = useSelector(getProducts)

  useEffect(() => {
    dispatch(fetchProducts(10, 0))
  }, [])

  return products
}
