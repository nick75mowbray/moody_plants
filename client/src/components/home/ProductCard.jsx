import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import {Image, Transformation} from 'cloudinary-react';
import '../styles/style.scss';



const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    width: 350,
    // maxHeight: 550
  },
  
});


const ProductCard = ({name, image, price, size})=>{
  const classes = useStyles();

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
            <Image cloudName="dw7h2b2j3" 
              publicId={image} 
              responsive= {true}
              width="auto"
              dpr="auto" 
              crop="crop"
              sizes="100vw"
              clienthints="true">
              <Transformation quality="auto" fetchFormat="auto" height="400" crop="scale"/>
          </Image></div>
          
        </CardMedia>
        
        <CardContent className="card-content card-text">
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {price}
          </Typography>
          </div>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
