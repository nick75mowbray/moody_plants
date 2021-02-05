import React from 'react'
import { Typography, Button, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import Review from './Review';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CustomButton from '../styledComponents/CustomButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({ shippingData, checkoutToken, onbackStep, onCaptureCheckout, nextStep, timeout }) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement});

        if(error){
            console.error(error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { 
                    firstname: shippingData.firstName, 
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption,
                    payment: {
                        gateway: 'stripe',
                        stripe: {
                            payment_method_id: paymentMethod.id
                        }
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id, orderData);
            timeout();
            nextStep();

        }
    }

    return (
        <div>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>
                Payment Method
            </Typography>
            <div style={{
                minHeight: '30px',
                fontSize: '0.8rem'}}>
            <Elements stripe={stripePromise} style={{}}>
                <ElementsConsumer>
                    {({ elements, stripe })=>(
                        <form onSubmit={(event)=> {
                            handleSubmit(event, elements, stripe)
                        }}>
                            <CardElement />
                            <br /><br/>
                            <div style={{display:'flex',
                            justifyContent: 'space-between'}}>
                                <Button 
                                    variant="outlined" 
                                    style={{paddingLeft: '8px'}}
                                    onClick={onbackStep}>
                                    <ArrowLeftIcon/>Back</Button>
                                <CustomButton variant="contained" 
                                    type="submit"
                                    disabled={!stripe}
                                    >
                                        Pay { checkoutToken.live.subtotal.formatted_with_code }
                                    </CustomButton>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
            </div>
        </div>
    )
}

export default Payment
