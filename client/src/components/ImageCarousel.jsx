import React from 'react';
import {Image, Transformation} from 'cloudinary-react';
import './styles/style.scss';
import Carousel from 'react-bootstrap/Carousel'


function ImageCarousel({images, name}){
    

    return (
        <div>
        {images ? <div style=
            {{
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}>
            <Carousel>
  <Carousel.Item>
  <Image cloudName="dw7h2b2j3" 
                    publicId={images[0]} 
                    responsive= {true}
                    width="auto"
                    dpr="auto" 
                    crop="crop"
                    clienthints="true">
                    <Transformation quality="auto" fetchFormat="auto"/>
                </Image>

  </Carousel.Item>
  <Carousel.Item>
  <Image cloudName="dw7h2b2j3" 
                    publicId={images[1]} 
                    responsive= {true}
                    width="auto"
                    dpr="auto" 
                    crop="crop"
                    clienthints="true">
                    <Transformation quality="auto" fetchFormat="auto"/>
                </Image>

  </Carousel.Item>
  <Carousel.Item>
    <Image cloudName="dw7h2b2j3" 
                    publicId={images[2]} 
                    responsive= {true}
                    width="auto"
                    dpr="auto" 
                    crop="crop"
                    clienthints="true">
                    <Transformation quality="auto" fetchFormat="auto"/>
                </Image>
  </Carousel.Item>
  <Carousel.Item>
    <Image cloudName="dw7h2b2j3" 
                    publicId={images[3]} 
                    responsive= {true}
                    width="auto"
                    dpr="auto" 
                    crop="crop"
                    clienthints="true">
                    <Transformation quality="auto" fetchFormat="auto"/>
                </Image>
  </Carousel.Item>
</Carousel>
            
                
                
            

        </div>:<></>}
        </div>

)}

export default ImageCarousel;