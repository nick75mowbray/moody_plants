import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CustomButton from '../styledComponents/CustomButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    button: {
      marginRight: theme.spacing(1),
  }
  }),
);

type buttonProps = {
  onAddToCart: any,
  productId: string
}

const PurchaseButtons = ({onAddToCart, productId}:buttonProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <br></br>
        <CustomButton variant="contained" 
          className={classes.button}
          onClick={() => onAddToCart(productId, 1)}>
            Add to cart
        </CustomButton>
        <Link to="/cart" style={{textDecoration:'none'}}>
        <CustomButton variant="contained">
            Checkout
        </CustomButton>
        </Link>
    </div>
  );
}

export default PurchaseButtons;