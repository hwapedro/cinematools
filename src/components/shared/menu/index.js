import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import { autoRoutes } from 'global/routes'

import './styles.css'

export const Menu = ({ routeLevel }) => {
  const [level, setLevel] = useState(routeLevel)
  const history = useHistory()

  const handleAlignment = (event, newLevel) => {
    if (newLevel !== null) {
      setLevel(newLevel)
    }
  }

  return (
    <div className="menu">
      <div className="menu-title">Cinematools</div>
      <ToggleButtonGroup style={{ marginBottom: '15px' }} value={level} exclusive onChange={handleAlignment} aria-label="text alignment">
        <ToggleButton style={{ fontSize: '12px', padding: '0px 22px', height: '40px' }} value={1} aria-label="left aligned">
          simple
        </ToggleButton>
        <ToggleButton style={{ fontSize: '12px', padding: '0px 22px', height: '40px' }} value={2} aria-label="right aligned">
          complex
        </ToggleButton>
      </ToggleButtonGroup>
      {autoRoutes.map((route) => {
        if (route.routerLevel === level) {
          return (
            <Link key={route.name} to={route.route}>
              <div className={`tab ${route.route === history.location.pathname ? 'tab-active' : ''}`}>
                <span className="menu-item-icon">{route.icon}</span> {route.name}
              </div>
            </Link>
          )
        }
      })}
    </div>
  )
}
