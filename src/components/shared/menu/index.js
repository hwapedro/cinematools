import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { autoRoutes } from 'global/routes'

import './styles.css'

export const Menu = () => {
  const history = useHistory()

  return (
    <div className="menu">
      <div className="menu-title">Cinematools</div>
      {autoRoutes.map((route) => {
        return (
          <Link key={route.name} to={route.route}>
            <div className={`tab ${route.route === history.location.pathname ? 'tab-active' : ''}`}>{route.name}</div>{' '}
          </Link>
        )
      })}
    </div>
  )
}
