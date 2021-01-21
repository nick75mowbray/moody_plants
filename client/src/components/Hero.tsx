import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { HelpRounded } from '@material-ui/icons';

function Hero() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography component="div" 
        style={{ 
            backgroundColor: '#cfe8fc', 
            height: '20vh', 
            backgroundImage: 'url("https://via.placeholder.com/400")' }} />
      </Container>
      </>
  );
};

export default Hero;