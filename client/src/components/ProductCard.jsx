import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Image, Transformation} from 'cloudinary-react';
import './styles/style.scss';


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
    <Card className={classes.root} key={name}>
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
            maxHeight: '500'
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
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="h6">
            {price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`size: ${size.metric.width}cm x ${size.metric.height}cm | ${size.imperial.width}" x ${size.imperial.height}"`}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
