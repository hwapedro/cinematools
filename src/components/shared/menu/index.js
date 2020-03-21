import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PRODUCTS } from '../../../constants/routers'

export const Menu = () => {
  return (
    <div>
      <Link to={ROUTE_PRODUCTS}>products</Link>
    </div>
  )
}
