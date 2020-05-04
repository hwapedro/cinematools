import React, { useEffect } from 'react'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Auth } from './pages/auth'
import { CinemaPage } from './pages/cinemas'
import { Menu } from './shared/menu'
import { Page404 } from './pages/404'
import { ReportPage } from './pages/reports'
import { getIsLogin } from '../sagas/auth/selectors'
import { autoRoutes } from '../global/routes'

import '../assets/fonts/roboto.css'
import '../assets/css/layout.css'

function App() {
  const history = useHistory()
  const isLogin = useSelector(getIsLogin)

  useEffect(() => {
    console.log(isLogin)
    if (!isLogin) {
      history.replace('/')
    }
  }, [isLogin, history])

  if (!isLogin) {
    return (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    )
  }
  
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Auth} />
        {autoRoutes.map((route) => (
          <Route exact key={route.name} path={route.route} render={route.render} />
        ))}
        <Route
          path="/get/reports"
          exact
          component={() => (
            <div className="root">
              <Menu routeLevel={2} />
              <ReportPage />
            </div>
          )}
        />
        <Route
          path="/cinema/:cinemaId/"
          exact
          component={() => (
            <div className="root">
              <Menu routeLevel={2} />
              <CinemaPage />
            </div>
          )}
        />
        <Route component={Page404} />
      </Switch>
    </div>
  )
}

export default App
