import React from 'react';
import '../styles/style.scss';
import Carousel from 'react-bootstrap/Carousel'
import ThisCarouselItem from './CarouselItem';
import {Image, Transformation} from 'cloudinary-react';


const ImageCarousel = ({images})=>

{return (images ?
    <div style={{
        width:'100%',
        maxHeight: '80vh'
    }}>
    <Carousel>
        <Carousel.Item>
           <ThisCarouselItem image={images[0]}/>
        </Carousel.Item>
        <Carousel.Item>
            <ThisCarouselItem image={images[1]}/>
        </Carousel.Item>
        <Carousel.Item>
            <ThisCarouselItem image={images[2]}/>
        </Carousel.Item>
        <Carousel.Item>
            <ThisCarouselItem image={images[3]}/>
        </Carousel.Item>
    </Carousel>
</div>
: null
)}


export default ImageCarousel;

// https://res.cloudinary.com/dw7h2b2j3/image/upload/c_scale,f_auto,h_400,q_auto/c_crop,dpr_2.0,w_0/v1/plants/alocasia_03_xq2zro.jpg
// https://res.cloudinary.com/dw7h2b2j3/image/upload/c_scale,f_auto,h_400,q_auto/c_crop,dpr_2.0,w_400/v1/plants/alocasia_03_xq2zro.jpg
// https://res.cloudinary.com/dw7h2b2j3/image/upload/c_crop,dpr_2.0,w_0/v1/plants/alocasia_03_xq2zro.jpg