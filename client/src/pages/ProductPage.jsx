
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import API from "../utils/API";

function ProductPage(props) {
  const [product, setProduct] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/products/599dcb67f0f16317844583fc
  const {id} = useParams();
  console.log(id);
  useEffect(() => {
    API.getProduct(id)
      .then(res => {setProduct(res.data);
      console.log(res.data);})
      .catch(err => console.log(err));
  }, [])

  return (
    <>
    <Link to="/">
      <KeyboardBackspaceIcon/>
      </Link>
      <h1>{product.name}</h1>
    </>
    )
  }


export default ProductPage;
