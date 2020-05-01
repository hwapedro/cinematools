import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Auth } from './pages/auth'
import { FilmPage } from './pages/film'
import { Page404 } from './pages/404'
import { getIsLogin } from '../sagas/auth/selectors'
import { autoRoutes } from '../global/routes'

import '../assets/fonts/roboto.css'
import '../assets/css/layout.css'

function App() {
  const isLogin = useSelector(getIsLogin)

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Auth} />
        {autoRoutes.map((route) => (
          <Route exact key={route.name} path={route.route} render={route.render} />
        ))}
        <Route path="/film/:cinemaId/:filmId" exact component={FilmPage} />
        <Route component={Page404} />
      </Switch>
    </div>
  )
}

export default App
