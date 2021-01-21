import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ImageCropLandscape } from 'material-ui/svg-icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

interface Props {
    name: string, 
    price: number, 
    image: string, 
    description: string,
    key: number
}


const ProductCard: React.FC<Props> = ({name, image, description, price}:Props)=>{
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {console.log(price)}
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Monstera"
          height="140"
          image={image}
          title="Monstera"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            size: 50cm x 70cm | 20" x 30"
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
