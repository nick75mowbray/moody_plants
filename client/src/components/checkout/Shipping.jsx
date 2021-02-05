import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { Link } from 'react-router-dom';
import CustomButton from '../styledComponents/CustomButton';
import { commerce } from '../../lib/commerce';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Skeleton from '@material-ui/lab/Skeleton';

  


const Shipping = ({checkoutToken, next}) => {
    const methods = useForm();
    // shipping options state
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        console.log("shipping loaded")
    },[])

    // fetch shipping options
    const fetchShippingCountries = async (checkoutTokenId)=>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions }= await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    // run fetch functions
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    },[]);

    useEffect(()=>{
        if(shippingCountry) {
            fetchSubdivisions(shippingCountry);
        }
    },[shippingCountry])

    useEffect(()=>{
        if(shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        }
    },[shippingSubdivision])

    // map over shipping details to create an array of objects
    const countries = Object.entries(shippingCountries).map(
        ([code, name]) => ({
        id: code, label:name
        }))
    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
        id: code, label:name
        }))
    const options = shippingOptions.map((option) => (
        {
        id: option.id, label: `${option.description} - (${option.price.formatted_with_code})`
        }));

    return (
        <div>
            {!loading ? (
                <Skeleton width="100%">
                    <Typography>.</Typography>
                </Skeleton>
            ):<Typography variant="h6" gutterBottom>Shipping Address</Typography>}
            
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({ ... data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>

                        {/* first name */}
                    {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                    ):<FormInput
                            required 
                            name='firstName'
                            label='first name'
                        />}
                        
                    {/* last name */}
                    {!loading ? (
                    <Skeleton width='100%'>
                        <div style={{height: '30px'}}/>
                    </Skeleton>
                    ):<FormInput
                            required 
                            name='lastName'
                            label='last name'
                        />}
                        
                    {/* email */}
                    {!loading ? (
                    <Skeleton width='100%'>
                        <div style={{height: '30px'}}/>
                    </Skeleton>
                    ):<FormInput required name="email" label="Email" />
                    }

                    {/* address */}
                    {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                    ):  <FormInput
                        required 
                        name='address1'
                        label='street address'
                    />}
                      
                      {/* city */}
                      {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                    ):<FormInput
                            required 
                            name='city'
                            label='city/ suburb'
                        />}
                        
                        {/* postcode */}
                        {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                        ):<FormInput
                            required 
                            name='zip'
                            label='zip/ postcode'
                        />}
                        

                        {/* shipping country */}
                        <Grid item xs={12} sm={6}>
                        {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                        ):(
                        <><InputLabel>Shipping Country</InputLabel>
                            <Select 
                                value={shippingCountry}
                                fullWidth
                                onChange={(event)=>setShippingCountry(event.target.value)}>
                                    {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                    ))}
                                </Select>
                                </>)}
                            
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                    ):<><InputLabel>State/ Territory</InputLabel>
                            <Select 
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(event)=>setShippingSubdivision(event.target.value)}>
                                    {subdivisions.map((subdivision)=>(
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                    ))}
                                </Select></>}
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        {!loading ? (
                        <Skeleton width='100%'>
                            <div style={{height: '30px'}}/>
                        </Skeleton>
                    ):<><InputLabel>Shipping Options</InputLabel>
                            <Select 
                                value={shippingOption}
                                fullWidth
                                onChange={(event)=>setShippingOption(event.target.value)}>
                                    {options.map((option)=>(
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select></>}
                            
                        </Grid>
                        

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
                            <CustomButton type="submit">Next
                            <ArrowRightIcon/></CustomButton>
                        </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default Shipping
