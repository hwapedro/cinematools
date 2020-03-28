import React from 'react'
import { Link } from 'react-router-dom'
import { autoRoutes } from 'global/routes'

export const Menu = () => {
  return (
    <div>
      {autoRoutes.map(route => {
        return (
          <Link key={route.name} to={route.route}>
            {route.name}
            <br />
          </Link>
        )
      })}
    </div>
  )
}
