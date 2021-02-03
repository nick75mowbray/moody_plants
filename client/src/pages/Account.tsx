import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Account = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
    {isAuthenticated ? (
      <div>
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={user.picture}
            title={user.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {user.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Card>
      </div>
    ):<></>}
    </>
  );
};

export default Account;