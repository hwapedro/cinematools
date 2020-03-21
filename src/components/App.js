import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../assets/fonts/roboto.css'
import '../assets/css/layout.css'
import { getIsLogin } from '../sagas/auth/selectors'
import { useSelector } from 'react-redux'

import { Auth } from './pages/auth'
import { Main } from './pages/main/index'
import { Products } from './pages/products/index'
import { Menu } from './shared/menu/index'

function App() {
  const isLogin = useSelector(getIsLogin)
  console.log('@', isLogin)
  const AppLogin = () => (
    <>
      <Menu />
      <Route path="/" exact component={Main} />
      <Route path="/products" component={Products} />
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
