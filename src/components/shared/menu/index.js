import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PRODUCTS, ROUTE_ACTORS } from '../../../constants/routers'
import { autoRoutes } from '../../../global/routes'

export const Menu = () => {
  return (
    <div>
      <Link to={ROUTE_PRODUCTS}>products</Link><br/>
      <Link to={ROUTE_ACTORS}>actors</Link><br/>
      {autoRoutes.map(route => {
        return (
          <Link key={route.name} to={route.route}>{route.name}<br /></Link>
        )
      })}
    </div>
  )
}
