import React from 'react';
import ImageList from '../components/ImageList';
import Hero from '../components/Hero';
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