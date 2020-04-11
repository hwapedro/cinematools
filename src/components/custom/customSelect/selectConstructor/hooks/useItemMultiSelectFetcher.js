import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItems } from 'store/smart/selectors'

export const useItemMultiSelectFetcher = (model) => {
  const dispatch = useDispatch()
  const items = useSelector((state) => getItems(state, model))

  useEffect(() => {
    dispatch(smartActions[model].all(10000, 0))
  }, [])

  return items
}
