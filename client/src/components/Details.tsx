import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import mongoose from 'mongoose';
import PurchaseButtons from './PurchaseButton';


interface productType {
    _id: mongoose.Types.ObjectId,
    name: string,
    inventory: number,
    images: string[],
    size: {
        metric: {
            width: number,
            height: number
        },
        imperial: {
            width: number,
            height: number
        }
    }, 
    price: number, 
    description: string,
    views: number
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: '#2B2B2B'
  },
  pos: {
    marginBottom: 12,
  }
});

const Details = ({ name, description, price, size }: productType) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h3" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="h5">
          {`${price} AUD`}
        </Typography>
        {size ? 
            <Typography className={classes.pos} color="textSecondary">
                {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
            </Typography>
        :<></>}
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
    <PurchaseButtons/>
    </>
  );
}

export default Details;