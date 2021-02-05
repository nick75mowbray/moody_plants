import { readFileSync } from "fs";
import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Container, Divider, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles'
import Shipping from '../components/checkout/Shipping';
import Payment from '../components/checkout/Payment';
import Confirmation from '../components/checkout/Confirmation';
import { commerce } from '../lib/commerce';
import { cartInterface } from '../utils/cartInterface';
import { AnyARecord } from "dns";
import CustomButton from '../components/styledComponents/CustomButton';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';
import clsx from 'clsx';
import Skeleton from '@material-ui/lab/Skeleton';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

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
                setCheckoutToken(token);
            } catch (error){
                // history.pushState('/');
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
                <Paper style={{padding: '32px'}}>
                    <Typography 
                        variant="h6" 
                        align="center"
                        style={{paddingTop: '16px'}}
                        >Checkout</Typography>
                    <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector/>}>
                        {steps.map((step)=>(
                           <Step key={step}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{step}</StepLabel>
                        </Step> 
                        ))} 
                    </Stepper>
                    { activeStep === steps.length ? 
                    (order.customer ? <Confirmation order={order}/> 
                    // : isFinished ? (
                    //     <div>
                    //     Confirmation
                    //     <Typography>Thankyou for your purchase</Typography>
                    //     <Button component={Link} to="/" type="button">Back to site</Button>
                    // </div>
                     : (<div>
                            <CircularProgress/>
                        </div>) 
                    )
                        : checkoutToken && <Form/>
                          
                    }
                </Paper>
                </Container>
            </main>
        </div>
    )
}

export default Checkout
