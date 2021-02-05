import React, {useState, useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';
import DeleteIcon from '@material-ui/icons/Delete';
import Skeleton from '@material-ui/lab/Skeleton';

const Item = ({image, price, name, quantity, size, onUpdateCart, onRemoveFromCart, productId}) => {
const [loading, setLoading] = useState(false);

useEffect(()=>{
    setLoading(true);
},[])

    return (
        <div style={{
            display: 'flex',
            maxHeight: '200px',
            marginBottom: '2rem',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                {/* image */}
                {!loading ? (
                    <Skeleton width='100%' variant="rect">
                        <div style={{height: '200px'}}/>
                    </Skeleton>
                ):<Image cloudName="dw7h2b2j3" 
                publicId={image} 
                >
                <Transformation crop="fill" />
                <Transformation width="auto" dpr="auto" height="100" crop="scale" />
            </Image>}
            
            </div>
            {/* name and size */}
            <div style={{textAlign: 'start'}}>
                {!loading ? (
                    <Skeleton width='100%'>
                        <Typography>.</Typography>
                    </Skeleton>
                ): <Typography>{name}</Typography>}
                
                {/* size */}

                {size ? <div>
            <Typography variant="subtitle2" color="textSecondary">
                {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
            </Typography></div>
            :<Skeleton width='50px'></Skeleton>}
            </div>
            
            <div style={{textAlign: 'end'}}>
                <Typography>{price}</Typography>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <Button onClick={()=>{
                    onUpdateCart(productId, quantity-1);
                }}
                style={{padding: '0'}}>-</Button>
                    <Typography>{quantity}</Typography>
                <Button 
                    onClick={()=>{
                    onUpdateCart(productId, quantity+1)}}
                    style={{padding: '0'}}
                >+</Button>
                <Button>
                    <DeleteIcon onClick={()=>{
                        onRemoveFromCart(productId);
                    }}
                    style={{padding: '0'}}></DeleteIcon>
                </Button>
            </div>
        </div>
    )
};

export default Item;