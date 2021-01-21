import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Monstera"
          height="140"
          image="https://via.placeholder.com/400"
          title="Monstera"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Monstera Composition 1
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            size: 50cm x 70cm | 20" x 30"
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
