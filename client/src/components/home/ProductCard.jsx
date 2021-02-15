import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import {Image, Transformation} from 'cloudinary-react';
import '../styles/style.scss';
import Skeleton from '@material-ui/lab/Skeleton';



const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    width: 350,
    // maxHeight: 550
  },
  
});


const ProductCard = ({name, image, price, size})=>{
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
  },[])

  return (
    <Card className={classes.root} key={name} style={{
      maxWidth: '300px'
  }}>
      <CardActionArea>
        <CardMedia 
          component="div"
          alt={name}
          title={name}
        >
          <div 
          style={{
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: '400px'
            }}
             >
               {/* image */}
               {!loading ? (
                 <Skeleton variant="rect" width='100%'>
                   <div style={{height: '400px'}}/>
                 </Skeleton>
               ): <Image cloudName="dw7h2b2j3" 
              publicId={image} 
              alt={name}
              responsive= {true}
              width="auto"
              dpr="auto" 
              crop="crop"
              sizes="100vw"
              clienthints="true">
              <Transformation quality="auto" fetchFormat="auto" height="400" crop="scale"/>
          </Image>}
            </div>
          
        </CardMedia>
        
        <CardContent className="card-content card-text">

          {/* name */}
          {!loading ? (
            <Skeleton width='100%'>
              <Typography>.</Typography>
            </Skeleton>
          ):<Typography gutterBottom variant="h6">
            {name}
          </Typography>
          }
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>

            {/* size */}
            {!loading ? (
              <Skeleton width="50%">
                <Typography>.</Typography>
              </Skeleton>
            )
          :<Typography variant="body2" color="textSecondary" component="p">
            {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
          </Typography>}
          
          {/* price */}
          {!loading ? (
            <Skeleton width="50%">
              <Typography>.</Typography>
            </Skeleton>)
            :<Typography variant="subtitle1">
              {price}
            </Typography>}
          
          </div>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
