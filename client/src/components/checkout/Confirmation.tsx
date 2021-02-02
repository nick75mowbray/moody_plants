import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    return (
        <div>
            Confirmation
            <Typography>Thankyou for your purchase, firstname lastname</Typography>
            <Typography> order ref: ref</Typography>
            <Button component={Link} to="/" type="button">Back to site</Button>
        </div>
    )
}

export default Confirmation
