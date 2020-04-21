import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../assets/fonts/roboto.css'
import '../assets/css/layout.css'
import { getIsLogin } from '../sagas/auth/selectors'
import { useSelector } from 'react-redux'

import { Auth } from './pages/auth'
import { FilmPage } from './pages/film'
import { Main } from './pages/main/index'

import { autoRoutes } from '../global/routes'

function App() {
  const isLogin = useSelector(getIsLogin)
  const AppLogin = () => (
    <>
      <Route path="/" exact component={Main} />
      {autoRoutes.map((route) => (
        <Route key={route.name} path={route.route} render={route.render} />
      ))}
      <Route path="/film/:cinemaId/:filmId" exact component={FilmPage} />
    </>
  )
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Auth} /> <AppLogin />
      </Switch>
    </div>
  )
}

export default App
