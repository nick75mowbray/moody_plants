import React from 'react'
import { Typography, Button, Divider, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ checkoutToken }:any) => {
    return (
        <div>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product:any)=>(
                    <div>
                        <ListItem style={{
                            padding: '10px 0'
                        }} key={product.name}>
                            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                            <Typography variant="body2">{product.line_total.formatted_with_code}</Typography>
                        </ListItem>
                        <ListItem style={{ padding: '10px 0'}}>
                            <ListItemText primary="Total"/>
                            <Typography variant="subtitle1" style={{ fontWeight: 700}}>
                                {checkoutToken.live.subtotal.formatted_with_code}
                            </Typography>
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    )
}

export default Review