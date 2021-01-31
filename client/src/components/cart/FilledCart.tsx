import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Item from './Item';

import { cartInterface } from '../../utils/cartInterface';
import mongoose from 'mongoose';
import { commerceProductsInterface } from '../../utils/commerceProductsInterface';

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
    cart: cartInterface
};

const FilledCart = ({commerceProducts, products, cart}: propsType) => {

    let productImages:string[] = [];
    if(products){

        cart.line_items.map((cartItem)=>{
            const matchingCommerceProductArray = products.filter( product => product.commercePermalink === cartItem.permalink);
            const [matchingProduct] = matchingCommerceProductArray;
            if (matchingProduct){
              productImages.push(matchingProduct.images[2]);  
            }
            
        })
    }
    

    return (
        <>
        <Grid container spacing={4}>
            {cart.line_items.map((item, index) => (
                <Grid item key={item.id}>
                    <Item 
                        image={productImages[index]} 
                        price={item.price.formatted_with_code}
                        name={item.name}
                        quantity={item.quantity}/>
                   
                </Grid>
            ))}
        </Grid>
        </>
    )
    
};


export default FilledCart;