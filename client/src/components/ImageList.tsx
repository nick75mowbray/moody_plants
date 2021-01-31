import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import API from '../utils/API';
import mongoose from 'mongoose';
import { commerceProductsInterface } from '../utils/commerceProductsInterface';

// typing for individual products
interface productType {
    _id: mongoose.Types.ObjectId,
    name: string,
    inventory: number,
    images: string[],
    size: {
        metric: {
            width: number,
            height: number
        },
        imperial: {
            width: number,
            height: number
        }
    }, 
    price: number, 
    description: string,
    views: number,
    commercePermalink: string
}

// create type for an array of products
type productStateType = productType[];
type commerceType = {commerceProducts: commerceProductsInterface[]};



const ImageList = ({commerceProducts}:commerceType)=> {

const [products, setProducts] = useState<productStateType | undefined>(undefined);

// load all products
useEffect(()=>{
    loadProducts();
}, []);

function loadProducts() {
    API.getProducts()
    .then(res => {
        setProducts(res.data);
        }
        )
        
        .catch(err=>console.error(err));
}

    return (
        <div className="image-grid product-list">
        {products ? products.map((product, index)=>{
            const matchingCommerceProductArray = commerceProducts.filter( item => item.permalink === product.commercePermalink);
            const [matchingProduct] = matchingCommerceProductArray;
            console.log(matchingProduct);
            return (
                <div className="product-card product-container" key={index}>
                <Link to={"/products/"+product._id} className="product-link">
                        <ProductCard
                            name={product.name}
                            image={product.images[0]}
                            price={matchingProduct.price.formatted_with_symbol}
                            size={product.size}
                        />
                </Link>
                </div>
                )
        }):<></>}
        </div>
    )
}

export default ImageList;