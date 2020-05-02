import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
    yellow: {
      main: '#fbc02d',
    },
  }
})

export default theme
