import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const myTheme = createMuiTheme({
    palette: {
        common: {
            black: '#2B2B2B'
        },
        primary: {
            main: '#00B800'
        },
        secondary: {
            main: orange[500],
        }
    }, 
    shape: {
        borderRadius: 0
    },
    typography: {
        htmlFontSize: 22
    }
});

type Props = {
    children: JSX.Element
}

const MyCustomTheme = ({children}:Props) => {
  return (
    <ThemeProvider theme={myTheme}>
      {children}
    </ThemeProvider>
  );
}

export default MyCustomTheme;