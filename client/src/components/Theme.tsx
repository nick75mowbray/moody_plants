import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const myTheme = createMuiTheme({
    
    palette: {
        common: {
            black: '#2B2B2B'
        },
        primary: {
            main: '#fff',
            contrastText: '#2B2B2B'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff'
        },
    }, 
    shape: {
        borderRadius: 0
    },
    
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