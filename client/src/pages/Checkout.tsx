import { readFileSync } from "fs";

import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Confirmation from '../components/checkout/Confirmation';
import { commerce } from '../lib/commerce';
import { cartInterface } from '../utils/cartInterface';
import { AnyARecord } from "dns";

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
    const [checkoutToken, setCheckoutToken] = useState<any>();
    const [shippingData, setShippingData] = useState({});

    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                console.log(`token is ${JSON.stringify(token)}`);
                setCheckoutToken(token);
            } catch (error){
                console.error(error)
            }
        }
        generateToken();
    }, [cart]);

    const Form = () => activeStep === 0
        ? <Shipping checkoutToken={checkoutToken} next={next}/>
        : <Payment shippingData={shippingData} checkoutToken={checkoutToken} onbackStep={backStep}/>


    const nextStep = () => setActiveStep((previousActiveStep)=>previousActiveStep+1)
    const backStep = () => setActiveStep((previousActiveStep)=>previousActiveStep-1)

    const next = (data:any) => {
        setShippingData(data);
        nextStep();
    }    

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
                        : checkoutToken && <Form/>
                    }
                </Paper>
            </main>
        </div>
    )
}

export default Checkout
