import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Paper, Button, Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../components/checkout/CustomTextField';

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
  const methods = useForm();
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
        <Paper>
        <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({ ... data}))}>
                    <Grid container spacing={3}>

                        {/* first name */}
                    <FormInput
                            required 
                            name='firstName'
                            label='first name'
                            defaultValue={userData.firstname}
                        />
                        
                    {/* last name */}
                    <FormInput
                            required 
                            name='lastName'
                            label='last name'
                            defaultValue={userData.lastname}
                        />
                        
                    {/* email */}
                    <FormInput 
                      required 
                      name="email" 
                      label="Email"
                      defaultValue={userData.email} />
                    

                    {/* address */}
                    {userData.address.street ? <FormInput
                        required 
                        name='address1'
                        label='street address'
                        defaultValue={userData.address.street}
                    />: <FormInput
                        required 
                        name='address1'
                        label='street address'
                    />}
                    
                      
                      {/* city */}
                      {userData.address.city ? <FormInput
                            required 
                            name='city'
                            label='city/ suburb'
                            defaultValue={userData.address.city}
                        />: <FormInput
                            required 
                            name='city'
                            label='city/ suburb'
                        /> }
                    
                        
                        {/* postcode */}
                        {userData.address.zip ? <FormInput
                            required 
                            name='zip'
                            label='zip/ postcode'
                            defaultValue={userData.address.zip}
                        /> : <FormInput
                            required 
                            name='zip'
                            label='zip/ postcode'
                        />
                        }
                        

                        
                        

                    </Grid>
                    <br />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Link to="/cart" style={{textDecoration: 'none'}}>
                                <Button variant="outlined" style={{paddingLeft: '8px'}}>
                                    <ArrowLeftIcon/>Back</Button>
                            </Link>
                            {/* <Button type="submit" variant="contained">Next</Button> */}
                            <CustomButton type="submit">Create Account
                            <ArrowRightIcon/></CustomButton>
                        </div>
                </form>
            </FormProvider>
            </Paper>
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