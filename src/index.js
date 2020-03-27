import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import {SmartConstructor} from './components/shared/smart/smartConstructor'
import store from './store'
import theme from './theme/color'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
        <SmartConstructor model='actors' value={{name: 'asd'}} edittMode/>
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
