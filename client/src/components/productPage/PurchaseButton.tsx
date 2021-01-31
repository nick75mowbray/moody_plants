import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    button: {
      background: 'linear-gradient(to bottom, #11998e, #38ef7d)'
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
        <Button 
          variant="contained" 
          className={classes.button}
          onClick={() => onAddToCart(productId, 1)}>
            Add to cart
        </Button>
        <Button variant="contained" className={classes.button}>
            Checkout
        </Button>
    </div>
  );
}

export default PurchaseButtons;