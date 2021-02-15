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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // fetch usermeta data
  useEffect(() => {
    const getUserMetadata = async () => {
      
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserMetadata();
  }, []);

  // update user metadata
  const updateUserMetadata = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "update:current_user_metadata",
      });
      const userDetailsUpdateUrl = `https://${domain}/api/v2/users/${user.sub}`;
      var options = {
        method: "PATCH",
        url: userDetailsUpdateUrl,
        headers: {
          authorization: `Bearer ${accessToken}`, 
          'content-type': 'application/json'},
        data: {
          user_metadata: {
            address: {
              street: '123 Main Street, Anytown, ST 12345',
              city: '',
              zip: ''}
            }
          }
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
        
    } catch (e) {
      console.error(e);
    }
  };

  const updateUserData = (event) => {
    event.preventDefault();
    updateUserMetadata();
  }
  

  return (
    <div>
    <main style={{marginTop: '100px'}}>
      <Container maxWidth="xs">
    {isAuthenticated ? (
      <div>
        <Card >
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
        {/* user metadata */}
        <h3>User Metadata</h3>
        {userMetadata ? (<div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="street" label="street address" value={user.user_metadata.address.street}/>
            <TextField id="city" label="city/ suburb" value={user.user_metadata.address.city}/>
            <TextField id="zip" label="zip/ postcode" value={user.user_metadata.address.zip}/>
            <CustomButton type="submit" onSubmit={(event)=>updateUserData(event)}/>
        </form>
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          </div>
        ) : (
          <div>
          "No user metadata defined"
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Standard" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
          </div>
        )}
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