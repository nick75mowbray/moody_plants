
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Grid, Box } from '@material-ui/core';
import API from "../utils/API";
import '../components/styles/style.scss';
import ImageCarousel from '../components/ImageCarousel';
import Details from '../components/Details';

function ProductPage(props) {
  const [product, setProduct] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/products/599dcb67f0f16317844583fc
  const {id} = useParams();
  useEffect(() => {
    API.getProduct(id)
      .then(res => {
        setProduct(res.data);
      console.log(res.data);})
      .catch(err => console.log(err));
  }, [])

  
  return (
    <>
    <Link to="/">
      <KeyboardBackspaceIcon color="text.primary"/>
    </Link>
    <Box m={1}>
      <Grid container spacing={1}>
        <Grid item sm={6} mg={12}>
          <ImageCarousel 
            images={product.images}
            name={product.name}/>
        </Grid>
        <Grid item sm={6} mg={12}>
          <Details 
            name={product.name}
            description={product.description}
            price={product.price}
            size={product.size}
          />
        </Grid>
      </Grid>
    </Box>
    </>
    )
  }


export default ProductPage;
