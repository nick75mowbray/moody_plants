import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardMedia, CardContent, Button, CardActionArea, Card, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';


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
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
    <main style={{marginTop: '100px'}}>
      <Container maxWidth="xs">
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
    )
    :<>
        <Typography variant="h6" style={{paddingTop: '20px'}}>Login to view your account..</Typography>
        <Link 
            className="drawer-link" 
            color="inherit" 
            to="/login" 
            onClick={() => loginWithRedirect()}>
              <Button variant="contained" color="secondary">LOGIN</Button>
        </Link>
      </>}
      </Container>
    </main>
    </>
  );
};

export default Account;