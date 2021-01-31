import React from 'react';
import { Typography, Grid, Paper, Container, Divider } from '@material-ui/core';
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

type productSizes = {
        metric: {
            width: number,
            height: number
        },
        imperial: {
            width: number,
            height: number
        }
};

const FilledCart = ({commerceProducts, products, cart}: propsType) => {


    let productImages:string[] = [];
    let productSizes: productSizes[] = [];

    if(products){

        cart.line_items.map((cartItem)=>{
            const matchingCommerceProductArray = products.filter( product => product.commercePermalink === cartItem.permalink);
            const [matchingProduct] = matchingCommerceProductArray;
            if (matchingProduct){
              productImages.push(matchingProduct.images[2]);  
              productSizes.push(matchingProduct.size);
              console.log(productSizes);
            }
            
        })
    }
    

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
        <Paper style={{
            marginTop: '4rem',
            textAlign: 'center',
            maxWidth: '800px'
        }}>
            <Container max-width="xs">
                <Grid container spacing={4}>
                    {cart.line_items.map((item, index) => (
                        <Grid item key={item.id} xs={12} spacing={2}>
                            <Item 
                                image={productImages[index]} 
                                price={item.price.formatted_with_code}
                                name={item.name}
                                quantity={item.quantity}
                                size={productSizes[index]}
                                />
                            <Divider/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Paper>
        </div>
    )
    
};


export default FilledCart;