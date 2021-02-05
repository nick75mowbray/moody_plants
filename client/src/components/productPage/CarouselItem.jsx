import React, { useState, useEffect } from 'react';
import {Image, Transformation} from 'cloudinary-react';
import Skeleton from '@material-ui/lab/Skeleton';


const CarouselItem = ({image})=>{
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
  },[])

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
           {!loading ? (
              <Skeleton width='100%' variant="rect">
              <div style={{height: '500px', width: '100%'}}/>
            </Skeleton>
           ):<Image cloudName="dw7h2b2j3" 
                publicId={image} 
                >
                <Transformation crop="fill" />
                <Transformation width="auto" dpr="auto" height="500" crop="scale" />
            </Image>}
        
  </div>
            
      

)}

export default CarouselItem;