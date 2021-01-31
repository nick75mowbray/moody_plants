import React from 'react';
import ImageList from '../components/home/ImageList';
import Hero from '../components/home/Hero';
import { commerceProductsInterface } from '../utils/commerceProductsInterface';

type commerceType = {commerceProducts: commerceProductsInterface[]};

const Home = ({commerceProducts}: commerceType) => {
    return (
        <>
            <Hero/>
            <ImageList commerceProducts={commerceProducts}/>
        </>
    )
}

export default Home;