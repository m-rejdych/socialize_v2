import { createMuiTheme } from '@material-ui/core';
import { pink, yellow } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, Roboto, sans-serif',
  },
  palette: {
    type: 'dark',
    primary: yellow,
    secondary: pink,
  },
});

export default theme;
