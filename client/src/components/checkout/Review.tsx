import React from 'react'
import { Typography, Button, Divider, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ checkoutToken }:any) => {
    return (
        <div>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product:any)=>(
                    <div key={product.id}>
                        <ListItem style={{
                            
                        }}>
                            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                            <Typography variant="body2">{product.line_total.formatted}</Typography>
                        </ListItem>
                        
                    </div>
                ))}
                {/* subtotal */}
                <ListItem>
                            <ListItemText primary="Subtotal"/>
                            <Typography variant="subtitle2" style={{ fontWeight: 400}}>
                                {checkoutToken.live.subtotal.formatted}
                            </Typography>
                        </ListItem>
                {/* shipping */}
                <ListItem >
                            <ListItemText primary="Shipping"/>
                            <Typography variant="subtitle2" style={{ fontWeight: 400}}>
                                {checkoutToken.live.shipping.available_options[0].price.formatted}
                            </Typography>
                        </ListItem>
                {/* total price */}
                <ListItem >
                            <ListItemText primary="Total"/>
                            <Typography variant="subtitle1" style={{ fontWeight: 700}}>
                                {checkoutToken.live.total.raw
                                +checkoutToken.live.shipping.available_options[0].price.raw}.00 AUD
                            </Typography>
                        </ListItem>
            </List>
        </div>
    )
}

export default Review