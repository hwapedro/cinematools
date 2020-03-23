import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PRODUCTS, ROUTE_ACTORS } from '../../../constants/routers'

export const Menu = () => {
  return (
    <div>
      <Link to={ROUTE_PRODUCTS}>products</Link>
      <Link to={ROUTE_ACTORS}>actors</Link>
    </div>
  )
}
