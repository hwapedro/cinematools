import React from 'react'
import { Link } from 'react-router-dom'
import { autoRoutes } from 'global/routes'
import modelStyles from './styles/models.style'
import styles from './styles/styles'

export const Menu = () => {

  return (
    <div>
      {autoRoutes.map(route => {
        return (
          <Link style={{ ...styles,  ...modelStyles[route.name] }} key={route.name} to={route.route}>
            {route.name}
            <br />
          </Link>
        )
      })}
    </div>
  )
}
