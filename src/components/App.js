import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../assets/fonts/roboto.css'
import '../assets/css/layout.css'
import { getIsLogin } from '../sagas/auth/selectors'
import { useSelector } from 'react-redux'

import { Auth } from './pages/auth'
import { Main } from './pages/main/index'
import { Menu } from './shared/menu/index'
import { autoRoutes } from '../global/routes'

function App() {
  const isLogin = useSelector(getIsLogin)
  const AppLogin = () => (
    <>
      <Menu />
      <Route path="/" exact component={Main} />
      {autoRoutes.map(route => {
        return <Route key={route.name} path={route.route} render={route.render} />
      })}
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
