import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { commerceProductsInterface } from '../../utils/commerceProductsInterface';
import mongoose from 'mongoose';
import { Container, Grid } from '@material-ui/core';


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

// create type for an array of products
type productStateType = productType[];

type propsType = {
    commerceProducts: commerceProductsInterface[],
    products: productStateType | undefined,
    searchTerm: string,
    loading: boolean,
};

const ImageList = ({commerceProducts, products, searchTerm, loading}: propsType) => {


    return (
        <Container>
        <div className="image-grid product-list">
            <Grid container justify="center">
                {products ? products.filter((data)=>{
                if(searchTerm == "")
                    return data
                else if(data.name.toLowerCase().includes(searchTerm.toLowerCase()) || data.description.toLowerCase().includes(searchTerm.toLowerCase())){
                    return data
                }
                }).map((product, index)=>{
                    const matchingCommerceProductArray = commerceProducts.filter( item => item.permalink === product.commercePermalink);
                    const [matchingProduct] = matchingCommerceProductArray;
                    return (
                        <div className="product-card product-container" key={index}>
                            <Grid item xs={12} sm={6} md={3} >
                                <Link to={"/products/"+product._id} className="product-link" >
                                    {matchingProduct ? <ProductCard
                                            name={product.name}
                                            image={product.images[0]}
                                            price={matchingProduct.price.formatted_with_code}
                                            size={product.size}
                                            loading={loading}
                                        /> : <ProductCard
                                        name={product.name}
                                        image={product.images[0]}
                                        price='...'
                                        size={product.size}
                                        loading={loading}
                                    />}
                                        
                                </Link>
                            </Grid>
                        </div>
                        )
                }):<></>}
            </Grid>
        </div>
        </Container>
    )
}

export default ImageList;