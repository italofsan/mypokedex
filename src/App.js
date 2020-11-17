import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from './routes';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'VT323',
    ].join(','),
  },});

const App = () => {

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
};
export default App;
