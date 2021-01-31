import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { cartInterface } from '../utils/cartInterface';
import EmptyCart from '../components/cart/EmptyCart';
import FilledCart from '../components/cart/FilledCart'

type cartProps = {
    cart: cartInterface
}
const Cart = ({cart}:cartProps) => {
    const isEmpty = !cart.line_items.length;


    return (
        <Container>
            <div >
                <Typography>Your Cart</Typography>
                {isEmpty ? <EmptyCart/>:<FilledCart/>}
            </div>
        </Container>
    )
} 

export default Cart;