import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';

import { commerce } from '../../lib/commerce';


const Shipping = ({checkoutToken}) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivisios] = useState([]);
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippinOption, setShippinOption] = useState([]);

    const fetchShippingCountries = async (checkoutTokenId)=>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    },[]);

    const countries = Object.entries(shippingCountries).map(
        ([code, name]) => ({
        id: code, label:name
        })
    )

    return (
        <div>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form>
                    <Grid container spacing={3}>
                        <FormInput
                            required 
                            name='firstname'
                            label='firstname'
                        />
                        <FormInput
                            required 
                            name='lastname'
                            label='lastname'
                        />
                        <FormInput
                            required 
                            name='street address'
                            label='street address'
                        />
                        <FormInput
                            required 
                            name='city/ suburb'
                            label='city/ suburb'
                        />


                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
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
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select 
                                value={}
                                fullWidth
                                onChange={}>
                                    <MenuItem key={} value={}>
                                        Select me
                                    </MenuItem>
                                </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select 
                                value={}
                                fullWidth
                                onChange={}>
                                    <MenuItem key={} value={}>
                                        Select me
                                    </MenuItem>
                                </Select>
                        </Grid> */}

                    </Grid>
                </form>
            </FormProvider>
        </div>
    )
}

export default Shipping
