import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './styles/style.scss';
import {Image, Transformation} from 'cloudinary-react';

function Hero() {
  return (
    <>
      <CssBaseline />
      <Container className="hero full-width-image">
        {/* <Typography component="div" 
        style={{ 
            backgroundColor: '#cfe8fc', 
            height: '30vh', 
            backgroundImage: 'url("https://via.placeholder.com/400")' }} /> */}
            <div style={{
              height: '25vw',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              width: '100vw',
              justifyContent: 'center'  
              }}>
            <Image cloudName="dw7h2b2j3" 
              publicId="plants/hero2_bbtuo0.jpg" 
              responsive="true"
              width="auto"
              dpr="auto" 
              crop="scale"
              clientHints="true">
              <Transformation quality="auto" fetchFormat="auto" />
              </Image>
            </div>
      </Container>
      </>
  );
};

export default Hero;