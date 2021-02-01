import React from 'react'
import { Typography, Button, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import Review from './Review';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('...');

const Payment = ({ shippingData, checkoutToken, onbackStep }:any) => {
    return (
        <div>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe })=>(
                        <form>
                            <CardElement />
                            <br /><br/>
                            <div style={{display:'flex',
                            justifyContent: 'space-between'}}>
                                <Button variant="outlined"
                                    onClick={onbackStep}>Back</Button>
                                <Button variant="contained" 
                                    type="submit"
                                    disabled={!stripe}
                                    color="primary">
                                        Pay { checkoutToken.live.subtotal.formatted_with_code }
                                    </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default Payment
