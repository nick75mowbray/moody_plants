import { readFileSync } from "fs";

import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Confirmation from '../components/checkout/Confirmation';
import { commerce } from '../lib/commerce';
import { cartInterface } from '../utils/cartInterface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

const steps: string[] = ['shipping address', 'Payment details'];

type checkoutProps = {
    cart: cartInterface
}

const Checkout = ({cart}: checkoutProps) => {
    const classes = useStyles();
    const [activeStep, setActiveStep ] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState<string>();

    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                console.log(`token is ${token}`);
                setCheckoutToken(token);
            } catch (error){
                console.error(error)
            }
        }
        generateToken();
    }, []);

    const Form = () => activeStep === 0
        ? <Shipping/>
        : <Payment/>


    return (
        <div>
            <main>
                <Paper>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} alternativeLabel color="success">
                        {steps.map((step)=>(
                           <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step> 
                        ))} 
                    </Stepper>
                    { activeStep === steps.length ? 
                        <Confirmation/> 
                        : <Form/>
                    }
                </Paper>
            </main>
        </div>
    )
}

export default Checkout
