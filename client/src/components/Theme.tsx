import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

const myTheme = createMuiTheme({
    palette: {
        common: {
            black: '#2B2B2B'
        },
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#eee',
        },
    }, 
    shape: {
        borderRadius: 0
    },
    typography: {
        htmlFontSize: 16
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