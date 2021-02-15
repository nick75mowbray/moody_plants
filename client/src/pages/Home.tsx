import React from 'react';
import ImageList from '../components/home/ImageList';
import Hero from '../components/home/Hero';
import { commerceProductsInterface } from '../utils/commerceProductsInterface';
import mongoose from 'mongoose';
import { Container } from '@material-ui/core';


// typing for individual products
interface productType {
    _id: mongoose.Types.ObjectId,
    name: string,
    inventory: number,
    images: string[],
    size: {
        metric: {
            width: number,
            height: number
        },
        imperial: {
            width: number,
            height: number
        }
    }, 
    price: number, 
    description: string,
    views: number,
    commercePermalink: string
}


type propsType = {
    commerceProducts: commerceProductsInterface[],
    products: productType[] | undefined,
    searchTerm: string,
};

const Home = ({ commerceProducts, products, searchTerm }: propsType) => {
    return (
        <>
            <main style={{marginTop: '56px'}}>
                <Hero/>
                <Container maxWidth="lg">
                    <ImageList 
                        commerceProducts={commerceProducts} 
                        products={products}
                        searchTerm={searchTerm}/>
                </Container>
            </main>
        </>
    )
}

export default Home;