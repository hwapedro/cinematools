import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { smartActions } from 'store/smart/'
import { getItems } from 'store/smart/selectors'

export const useHallCellFetcher =  (model) => {
  console.log(model === 'halls', model)
  const dispatch = useDispatch()
  const items = useSelector((state) => getItems(state, 'hallCells'))

  useEffect(() => {

       dispatch(smartActions.hallCells.all(10000, 0))

  }, [])

  return items
}
