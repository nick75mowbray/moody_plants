import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, CardMedia, CardContent, Button, CardActionArea, Card, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    media: {
    height: 140,
  },
  }),
);


const Account = () => {
  const classes = useStyles();
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const [userData, setUserData] = useState();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // fetch user data
  useEffect(()=>{
    if (isAuthenticated){
      const data = {
        firstname: user.given_name,
        lastname: user.family_name,
        email: user.email,
        sub: user.sub,
        address: {
          street: "",
          city: "",
          zip: ""
        }
      };
      setUserData(data);
    }
  },[])
 

  return (
    <div>
    <main style={{marginTop: '100px'}}>
      <Container maxWidth="xs">
    {(isAuthenticated && userData) ? (
      <div>
        <h4>{userData.firstname}</h4>
        <h4>{userData.lastname}</h4>
        <h4>{userData.sub}</h4>
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
    </div>
  );
};

export default Account;