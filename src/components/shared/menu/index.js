import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import AssessmentIcon from '@material-ui/icons/Assessment'

import { autoRoutes } from 'global/routes'
import { logout } from 'sagas/auth/actions'

import './styles.css'

export const Menu = ({ routeLevel }) => {
  const [level, setLevel] = useState(routeLevel)
  const history = useHistory()
  const dispatch = useDispatch()

  const exit = () => {
    dispatch(logout())
    history.replace('/')
    return
  }

  const handleAlignment = (event, newLevel) => {
    if (newLevel !== null) {
      setLevel(newLevel)
    }
    return
  }

  return (
    <div className="menu">
      <div className="menu-title">
        Cinematools
        <IconButton type="button" onClick={() => exit()}>
          <ExitToAppIcon htmlColor="white" />
        </IconButton>
      </div>
      <ToggleButtonGroup style={{ marginBottom: '15px' }} value={level} exclusive onChange={handleAlignment} aria-label="text alignment">
        <ToggleButton style={{ fontSize: '12px', padding: '0px 27px', height: '35px' }} value={1} aria-label="left aligned">
          simple
        </ToggleButton>
        <ToggleButton style={{ fontSize: '12px', padding: '0px 27px', height: '35px' }} value={2} aria-label="right aligned">
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
        return null
      })}
      {level === 2 && (
        <Link key={'reports'} to={'/get/reports'}>
          <div className={`tab ${'/get/reports' === history.location.pathname ? 'tab-active' : ''}`}>
            <span className="menu-item-icon">
              <AssessmentIcon />
            </span>{' '}
            reports
          </div>
        </Link>
      )}
    </div>
  )
}
