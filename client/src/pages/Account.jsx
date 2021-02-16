import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Paper, Button, Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../components/checkout/CustomTextField';
import CustomButton from '../components/styledComponents/CustomButton';
import API from '../utils/API';

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
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const [userData, setUserData] = useState();
  const [userExists, setUserExists] = useState(false);

  // check if user exists on db
  const checkUserExists = ()=>{
    if (isAuthenticated){
      API.getUser(user.sub)
      .then(result => {
        setUserData(result.data);
        setUserExists(true);
      })
      .catch(err =>console.error(err));
    } 
  }

  // update userdetails in db
  const updateUserDetails = (data)=> {
    API.updateUser(user.sub, data)
    .then(result => {
      setUserData(result.data);
    })
    .catch(err => console.error(err));
  }

  // create a new user on db
  const createNewUser = (data)=> {
    API.saveUser(...data, {sub: user.sub})
    .then(result => {
      setUserData(result.data);

    })
    .catch(err => console.error(err));
  }

  const onSubmit = data => {
    console.log(data);
    if (userExists){
      updateUserDetails(data);
    } else {
      createNewUser(data);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // fetch user data
  useEffect(()=>{
    checkUserExists();
    if (isAuthenticated && !userExists){
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
      <Container maxWidth="sm">
    {(isAuthenticated && userData) ? (
      <div>        
        <Paper style={{padding: '32px'}}>
        <Typography 
                        variant="h6" 
                        align="center"
                        style={{paddingTop: '16px'}}
                        >Account details</Typography>
        <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            margin: '10px'
                        }}>
                            
                            {userExists ? <CustomButton type="submit">Create Account</CustomButton>
                            :
                            <CustomButton type="submit">Save</CustomButton> }
                            
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