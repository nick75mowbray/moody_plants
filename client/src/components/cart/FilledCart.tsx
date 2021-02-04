import React from 'react';
import { Typography, Grid, Paper, Container, Divider } from '@material-ui/core';
import Item from './Item';
import { cartInterface } from '../../utils/cartInterface';
import mongoose from 'mongoose';
import { Link } from 'react-router-dom';
import CustomButton from '../styledComponents/CustomButton';


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
interface updateCart {
    (productId: string, quantity:number): Promise<void>
}

interface removeFromCart {
    (productId: string): Promise<void>
}

type propsType = {
    products: productType[] | undefined,
    cart: cartInterface,
    onUpdateCart: updateCart,
    onRemoveFromCart: removeFromCart
};



const FilledCart = ({ products, cart, onUpdateCart, onRemoveFromCart}: propsType) => {

    let productImages:string[] = [];
    let productSizes: productSizes[] = [];

    if(products){

        cart.line_items.map((cartItem)=>{
            const matchingCommerceProductArray = products.filter( product => product.commercePermalink === cartItem.permalink);
            const [matchingProduct] = matchingCommerceProductArray;
            if (matchingProduct){
              productImages.push(matchingProduct.images[0]);  
              productSizes.push(matchingProduct.size);
            }
            
        })
    }
    

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
            <div style={{
                maxWidth: '800px'
            }}>
        <Paper style={{
            marginTop: '1rem',
            textAlign: 'center',
            padding: '1.5rem'
        }}>
            <Container>
                <Grid container spacing={4}>
                    {cart.line_items.map((item, index) => (
                        <Grid item key={item.id} xs={12}>
                            <Item 
                                image={productImages[index]} 
                                price={item.price.formatted_with_code}
                                name={item.name}
                                quantity={item.quantity}
                                size={productSizes[index]}
                                onUpdateCart={onUpdateCart}
                                onRemoveFromCart={onRemoveFromCart}
                                productId={item.id}
                                />
                            <Divider/>
                        </Grid>
                    ))}
                    
                    
                </Grid>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Typography variant="subtitle1">
                                Subtotal: {cart.subtotal.formatted_with_code}
                                
                            </Typography>
                        </div>
                            </Container>
        </Paper>

            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
                }}>
            
                <Link to="/checkout" style={{textDecoration:'none'}}>
                    <CustomButton variant="contained">
                        Checkout
                    </CustomButton>
                </Link>
            </div>
            </div>
        </div>
    )
    
};


export default FilledCart;