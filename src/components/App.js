import React from 'react'
import { Switch, Route } from 'react-router-dom'
import '../assets/fonts/roboto.css'
import '../assets/css/layout.css'

import { Auth } from './pages/auth'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          123
        </Route>
        <Route path="/login" component={Auth} />
      </Switch>
    </div>
  )
}

export default App
