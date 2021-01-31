import React from 'react';
import { Typography } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';

const Item = ({image, price, name, quantity, size}) => {
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
            <div>
                <Typography>{quantity}</Typography>
            </div>
        </div>
    )
};

export default Item;