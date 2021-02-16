import { Typography, Container } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import CustomButton from '../styledComponents/CustomButton';

const Confirmation = (order:any) => {
    return (
        <Container maxWidth="sm">
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems:'center',
            textAlign:'center'
        }}>
            <img src={logo}
            alt="logo"
            height='80px'
            style={{marginBottom: '1rem'}}/>
            <Typography variant="h5" gutterBottom> ORDER PLACED: {order.order.customer_reference}</Typography>
            <Typography variant="body2">Thankyou for your purchase, {order.order.customer.firstname} {order.order.customer.lastname} an email will be sent to {order.order.customer.email} with your order details</Typography>
            <Link to="/" style={{textDecoration: 'none'}}>
                <CustomButton>Back to site</CustomButton>
            </Link>
        </div>
        </Container>
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