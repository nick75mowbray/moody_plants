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
  // const [userData, setUserData] = useState();
  // const [userExists, setUserExists] = useState(false);
  // console.log(`userExists: ${userExists}`);
  // console.log(`userData: ${JSON.stringify(userData)}`);

  // check if user exists on db
  // const checkUserExists = ()=>{
  //   if (isAuthenticated){
  //     API.getUser(user.sub)
  //     .then(result => {
  //       console.log(result.data[0]);
        
  //       if(result.data[0].sub){
  //         setUserData(result.data[0]);
  //          setUserExists(true);
  //       }
       
  //     })
  //     .catch(err =>console.error(err));
  //   } 
  // }

  // update userdetails in db
  // const updateUserDetails = (data)=> {
  //   API.updateUser(user.sub, data)
  //   .then(result => {
  //     setUserData(result.data);
  //   })
  //   .catch(err => console.error(err));
  // }

  // create a new user on db
  // const createNewUser = (data)=> {
  //   data.sub = user.sub;
  //   console.log(`data with sub? ${JSON.stringify(data)}`);
  //   API.saveUser(data)
  //   .then(result => {
  //     setUserData(result.data);
  //     setUserExists(true);
  //   })
  //   .catch(err => console.error(err));
  // }

  // const onSubmit = data => {
  //   console.log(data);
  //   if (userExists){
  //     console.log(`update user data`);
  //     updateUserDetails(data);
  //   } else {
  //     console.log('create new user');
  //     createNewUser(data);
  //   }
  // };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // fetch user data
  // useEffect(()=>{
  //   checkUserExists();
  //   if (isAuthenticated && !userExists){
  //     const data = {
  //       firstname: user.given_name,
  //       lastname: user.family_name,
  //       email: user.email,
  //       sub: user.sub,
  //       street: "",
  //       city: "",
  //       zip: 0
  //     };
  //     setUserData(data);
  //   }
  // },[])
 
 


  return (
    <div>
    <main style={{marginTop: '100px'}}>
      <Container maxWidth="sm">
    {(isAuthenticated) ? (
      <div>        
        <Paper style={{padding: '32px'}}>
        <Typography 
                        variant="h6" 
                        align="center"
                        style={{padding: '16px 0'}}
                        >Account details</Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">first name</Typography>
                            <Typography variant="body1">{user.first_name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">last name</Typography>
                            <Typography variant="body1">{user.last_name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">email</Typography>
                            <Typography variant="body1">{user.email}</Typography>
                          </Grid>
                        </Grid>
        {/* <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>

                        {/* first name */}
                    {/* <FormInput
                            required 
                            name='firstname'
                            label='first name'
                            defaultValue={userData.firstname}
                        />
                         */}
                    {/* last name */}
                    {/* <FormInput
                            required 
                            name='lastname'
                            label='last name'
                            defaultValue={userData.lastname}
                        />
                         */}
                    {/* email */}
                    {/* <FormInput 
                      required 
                      name="email" 
                      label="Email"
                      defaultValue={userData.email} /> */}

                    {/* address */}
                    {/* {(userExists) ? <FormInput
                        required 
                        name='street'
                        label='street address'
                        defaultValue={userData.street}
                    />: <FormInput
                        required 
                        name='street'
                        label='street address'
                    />} */}
                    
                      
                      {/* city */}
                      {/* {(userExists) ? <FormInput
                            required 
                            name='city'
                            label='city/ suburb'
                            defaultValue={userData.city}
                        />: <FormInput
                            required 
                            name='city'
                            label='city/ suburb'
                        /> } */}
                    
                        
                        {/* postcode */}
                        {/* {(userExists) ? <FormInput
                            required 
                            name='zip'
                            label='zip/ postcode'
                            defaultValue={userData.zip}
                        /> : <FormInput
                            required 
                            name='zip'
                            label='zip/ postcode'
                        />
                        } */}

                    {/* </Grid>
                    <br />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            margin: '10px'
                        }}>
                            
                            {userExists ? <CustomButton type="submit">Save</CustomButton>
                            :<CustomButton type="submit">Create Account</CustomButton>
                             }
                            
                        </div>
                </form>
            </FormProvider> */} 
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