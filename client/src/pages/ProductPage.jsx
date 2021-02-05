
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Grid, Box } from '@material-ui/core';
import API from "../utils/API";
import '../components/styles/style.scss';
import ImageCarousel from '../components/productPage/ImageCarousel';
import Details from '../components/productPage/Details';

function ProductPage({commerceProducts, onAddToCart}) {
  const [product, setProduct] = useState({})

  // When this component mounts, grab the product with the _id of props.match.params.id
  // e.g. localhost:3000/products/599dcb67f0f16317844583fc
  const {id} = useParams();
  useEffect(() => {
    // load product data
    API.getProduct(id)
      .then(result => {
        setProduct(result.data);  
        // update product page views
        API.updateViews(id, {views: result.data.views+1})
            .then(res => {
              setProduct(res.data);
            })
            .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    
  }, [])

  const matchingCommerceProductArray = commerceProducts.filter( item => item.permalink === product.commercePermalink);
  const [matchingProduct] = matchingCommerceProductArray;
  
  return (
    <>
    <main style={{marginTop: '64px'}}>
      <Link to="/" style={{padding: '16px'}}>
        <KeyboardBackspaceIcon color="textPrimary"/>
      </Link>
      
      <Box m={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <ImageCarousel 
              images={product.images}
              name={product.name}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            {matchingProduct && <Details 
              name={product.name}
              description={product.description}
              price={matchingProduct.price.formatted_with_code}
              size={product.size}
              onAddToCart={onAddToCart}
              productId={matchingProduct.id}
            />}
            
          </Grid>
        </Grid>
      </Box>
    </main>
    </>
    )
  }


export default ProductPage;
