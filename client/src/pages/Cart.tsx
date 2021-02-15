import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { cartInterface } from '../utils/cartInterface';
import EmptyCart from '../components/cart/EmptyCart';
import FilledCart from '../components/cart/FilledCart';
import mongoose from 'mongoose';

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

const Cart = ({ products, cart, onUpdateCart, onRemoveFromCart}: propsType) => {
    const isEmpty = !cart.line_items.length;


    return (
        <main style={{marginTop: '64px'}}>
            <Container maxWidth="lg">
                <div style={{
                    display: 'flex',
                    alignItems:'center',
                    flexDirection: 'column',
                }}>
                    <Typography 
                        align="center" 
                        variant="h5" 
                        style={{paddingTop: '20px'}}>
                            Your Cart</Typography>
                    {isEmpty ? 
                        <EmptyCart/>:
                        <FilledCart 
                            cart={cart} 
                            products={products}
                            onUpdateCart={onUpdateCart}
                            onRemoveFromCart={onRemoveFromCart}
                            />}
                </div>
            </Container>
        </main>
    )
} 

export default Cart;