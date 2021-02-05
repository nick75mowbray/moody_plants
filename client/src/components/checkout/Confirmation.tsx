import { Typography, Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import CustomButton from '../styledComponents/CustomButton';

const Confirmation = (order:any) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <img src={logo}
            alt="logo"
            height='140px'/>
            <Typography variant="h4"> ORDER PLACED: {order.customer.reference}</Typography>
            <Typography variant="body1">Thankyou for your purchase, {order.customer.firstname} {order.customer.lastname}
            An email will be sent to {order.customer.email} with your order details</Typography>
            <Link to="/" style={{textDecoration: 'none'}}>
                <CustomButton>Back to site</CustomButton>
            </Link>
        </div>
    )
}

export default Confirmation
// let Confirmation = () => order.customer ? (
//     (
//         <div>
//             Confirmation
//             <Typography>Thankyou for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
//             <Typography> order ref: {order.customer.reference}</Typography>
//             <Button component={Link} to="/" type="button">Back to site</Button>
//         </div>
//     )
// )  : isFinished ? (
//     <div>
//     Confirmation
//     <Typography>Thankyou for your purchase</Typography>
//     <Button component={Link} to="/" type="button">Back to site</Button>
// </div>
// ) : (
//     <div>
//         <CircularProgress/>
//     </div>
// );  