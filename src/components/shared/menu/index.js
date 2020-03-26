import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PRODUCTS, ROUTE_ACTORS } from '../../../constants/routers'
import { autoRoutes } from '../../../models'

export const Menu = () => {
  return (
    <div>
      <Link to={ROUTE_PRODUCTS}>products</Link><br />
      <Link to={ROUTE_ACTORS}>actors</Link><br />
      {Object.keys(autoRoutes).map(key => {
        return (
          <Link key={key} to={autoRoutes[key].route}>{autoRoutes[key].name}<br /></Link>
        )
      })}
    </div>
  )
}
