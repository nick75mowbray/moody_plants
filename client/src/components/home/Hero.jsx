import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import '../styles/style.scss';
import {Image, Transformation} from 'cloudinary-react';
import Skeleton from '@material-ui/lab/Skeleton';

function Hero() {
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
  },[])
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
{!loading ? (
  <Skeleton width='100%' variant="rect">
    <div style={{height: '100%', width: '100%'}}/>
  </Skeleton>
):<Image cloudName="dw7h2b2j3" 
              publicId="plants/hero2_bbtuo0.jpg" 
              responsive= {true}
              width="auto"
              dpr="auto" 
              crop="scale"
              clienthints="true">
              <Transformation quality="auto" fetchFormat="auto" />
              </Image>}
            
            </div>
      </Container>
      </>
  );
};

export default Hero;