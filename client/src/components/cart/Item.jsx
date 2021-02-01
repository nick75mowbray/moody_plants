import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';
import DeleteIcon from '@material-ui/icons/Delete';

const Item = ({image, price, name, quantity, size, onUpdateCart, onRemoveFromCart, productId}) => {
    return (
        <div style={{
            display: 'flex',
            maxHeight: '200px',
            marginBottom: '2rem',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
            <Image cloudName="dw7h2b2j3" 
                publicId={image} 
                >
                <Transformation crop="fill" />
                <Transformation width="auto" dpr="auto" height="100" crop="scale" />
            </Image>
            </div>
            <div>
                <Typography>{name}</Typography>
            </div>
            {size ? 
            <Typography variant="subtitle2" color="textSecondary">
                {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
            </Typography>
            :<></>}
            
            <div>
                <Typography>{price}</Typography>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <Button onClick={()=>{
                    onUpdateCart(productId, quantity-1);
                }}>-</Button>
                    <Typography>{quantity}</Typography>
                <Button onClick={()=>{
                    onUpdateCart(productId, quantity+1);
                }}>+</Button>
                <Button>
                    <DeleteIcon onClick={()=>{
                        onRemoveFromCart(productId);
                    }}></DeleteIcon>
                </Button>
            </div>
        </div>
    )
};

export default Item;