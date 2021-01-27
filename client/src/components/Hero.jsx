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
              responsive= {true}
              width="auto"
              dpr="auto" 
              crop="scale"
              clienthints="true">
              <Transformation quality="auto" fetchFormat="auto" />
              </Image>
            </div>
      </Container>
      </>
  );
};

export default Hero;