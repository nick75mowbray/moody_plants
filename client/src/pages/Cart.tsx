import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { cartInterface } from '../utils/cartInterface';
import EmptyCart from '../components/cart/EmptyCart';
import FilledCart from '../components/cart/FilledCart';
import mongoose from 'mongoose';
import { commerceProductsInterface } from '../utils/commerceProductsInterface';

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
    commerceProducts: commerceProductsInterface[],
    products: productType[] | undefined,
    cart: cartInterface,
    onUpdateCart: updateCart,
    onRemoveFromCart: removeFromCart
};

const Cart = ({commerceProducts, products, cart, onUpdateCart, onRemoveFromCart}: propsType) => {
    const isEmpty = !cart.line_items.length;


    return (
        <Container>
            <div >
                <Typography>Your Cart</Typography>
                {isEmpty ? 
                    <EmptyCart/>:
                    <FilledCart 
                        cart={cart} 
                        commerceProducts={commerceProducts} 
                        products={products}
                        onUpdateCart={onUpdateCart}
                        onRemoveFromCart={onRemoveFromCart}
                        />}
            </div>
        </Container>
    )
} 

export default Cart;