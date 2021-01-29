
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Image, Transformation} from 'cloudinary-react';
import { Grid } from '@material-ui/core';
import API from "../utils/API";
import '../components/styles/style.scss';

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
    {product.images ? <div>
      <Image cloudName="dw7h2b2j3" 
              publicId={product.images[0]} 
              responsive= {true}
              width="auto"
              dpr="auto" 
              crop="crop"
              sizes="100vw"
              clienthints="true">
              <Transformation quality="auto" fetchFormat="auto" height="400" crop="scale"/>
          </Image>
      <h1>{product.name}</h1></div> : <></>}
    
    </>
    )
  }


export default ProductPage;
