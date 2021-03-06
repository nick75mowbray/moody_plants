import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import mongoose from 'mongoose';
import PurchaseButtons from './PurchaseButton';
import Skeleton from '@material-ui/lab/Skeleton';


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
  title: {
    fontSize: 14,
    color: '#2B2B2B'
  },
  pos: {
    marginBottom: 12,
  },
  paragraph: {
      lineHeight: 1.6
  }

});

type detailProps = {
  name:string,
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
  onAddToCart: any,
  productId: string,
  loading: boolean,
}

const Details = ({ name, price, size, onAddToCart, productId, loading}:detailProps) => {
  const classes = useStyles();

  return (
      <div>
    <Card className={classes.root}>
      <CardContent>

        {/* name */}
        {!loading ? (
          <Skeleton width='100%'>
            <Typography>.</Typography>
          </Skeleton>
        ):<Typography className={classes.title} variant="h3" gutterBottom>
          {name}
        </Typography>}

        {/* price */}
        {!loading ? (
          <Skeleton width='100%'>
            <Typography>.</Typography>
          </Skeleton>
        ):<Typography variant="h5" component="h5">
          {price}
        </Typography>}
        
        {/* size */}
        {!loading ? (
          <Skeleton width='100%'>
            <Typography>.</Typography>
          </Skeleton>
        ):(size ? 
            <Typography className={classes.pos} color="textSecondary">
                {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
            </Typography>
        :<></>)}
        
        {/* details */}
        <div style={{
            maxWidth: '90%'
        }}>
          {!loading ? (
          <Skeleton width='100%'>
            <Typography>.</Typography>
          </Skeleton>
        ):<Typography className={classes.paragraph} variant="body2" component="p">
        This limited edition fine art print featuring work by Nicholas Mowbray captures the stunning and often unseen details of plants. Using a variety of photography and lighting techniques he captures plants in rich and vibrant colours. This print makes a excellent addition to any home and is printed using top-quality printing techniques.
        </Typography>}
        
        <br />

        {!loading ? (
          <Skeleton width='100%'>
            <Typography>.</Typography>
          </Skeleton>
        ):<Typography className={classes.paragraph} variant="body2" color="textSecondary">
        Printing will take 3-5 days before shipping.
        </Typography>}
        
        {!loading ? (
          <Skeleton width='100%'>
            <Typography>.</Typography>
          </Skeleton>
        ):<Typography className={classes.paragraph} variant="body2" color="textSecondary">
        Frame not included.
        </Typography>}
        
        </div>
      </CardContent>
    </Card>
    <PurchaseButtons
      onAddToCart={onAddToCart}
      productId={productId}/>
    </div>
  );
}

export default Details;