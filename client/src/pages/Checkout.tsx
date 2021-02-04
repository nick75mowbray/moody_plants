import { readFileSync } from "fs";
import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Container, Divider, Button } from '@material-ui/core';
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
    cart: cartInterface,
    order: any,
    onCaptureCheckout: any,
    error: string
}

const Checkout = ({cart, order, onCaptureCheckout, error}: checkoutProps) => {
    const classes = useStyles();
    const [activeStep, setActiveStep ] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState<any>();
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const history:any = useHistory();

    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                console.log(`token is ${JSON.stringify(token)}`);
                setCheckoutToken(token);
            } catch (error){
                history.pushState('/');
            }
        }
        generateToken();
    }, [cart]);

    const Form = () => activeStep === 0
        ? <Shipping checkoutToken={checkoutToken} next={next}/>
        : <Payment 
            shippingData={shippingData} 
            checkoutToken={checkoutToken} 
            onbackStep={backStep}
            onCaptureCheckout={onCaptureCheckout}
            nextStep={nextStep}
            timeout={timeout}
            />

    const timeout = () => {
        setTimeout(()=>{
            setIsFinished(true);
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        (
            <div>
                Confirmation
                <Typography>Thankyou for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Typography> order ref: {order.customer.reference}</Typography>
                <Button component={Link} to="/" type="button">Back to site</Button>
            </div>
        )
    )  : isFinished ? (
        <div>
        Confirmation
        <Typography>Thankyou for your purchase</Typography>
        <Button component={Link} to="/" type="button">Back to site</Button>
    </div>
    ) : (
        <div>
            <CircularProgress/>
        </div>
    );   
    
    if(error) {
        <>
        <Typography variant="h5">Error: {error}</Typography>
        <Button component={Link} to="/" type="button">Back to site</Button>
        </>
    }


    const nextStep = () => setActiveStep((previousActiveStep)=>previousActiveStep+1)
    const backStep = () => setActiveStep((previousActiveStep)=>previousActiveStep-1)

    const next = (data:any) => {
        setShippingData(data);
        nextStep();
    }    

    return (
        <div>
            <main style={{marginTop: '64px'}}>
                <Container maxWidth="sm">
                <Paper>
                    <Typography 
                        variant="h6" 
                        align="center"
                        style={{paddingTop: '16px'}}
                        >Checkout</Typography>
                    <Stepper activeStep={activeStep} alternativeLabel>
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
                </Container>
            </main>
        </div>
    )
}

export default Checkout
