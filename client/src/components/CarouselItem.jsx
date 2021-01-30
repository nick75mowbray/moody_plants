import React from 'react';
import {Image, Transformation} from 'cloudinary-react';



const CarouselItem = ({image})=>{
    console.log(image);
    console.log('carousel loaded');

    return (
            
      <div 
      style={{
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '500px'
        }}
         >
        <Image cloudName="dw7h2b2j3" 
          publicId={image} 
          >
          <Transformation crop="fill" />
          <Transformation width="auto" dpr="auto" height="500" crop="scale" />
      </Image>
  </div>
            
      

)}

export default CarouselItem;