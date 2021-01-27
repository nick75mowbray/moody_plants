import { ActionPictureInPicture } from 'material-ui/svg-icons';
import React, {ReactComponentElement, ReactNode, useEffect, useState} from 'react';
import ProductCard from './ProductCard';
import API from '../utils/API';
import mongoose from 'mongoose';

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
    views: number
}

// create type for an array of products
type productStateType = productType[];



const ImageList = ()=> {

const [products, setProducts] = useState<productStateType | undefined>(undefined);

// load all products
useEffect(()=>{
    loadProducts();
    console.log("loadProducts activated");
}, []);

function loadProducts() {
    API.getProducts()
    .then(res => {
        setProducts(res.data);
        console.log(res);}
        )
        
        .catch(err=>console.error(err));
}

    return (
        <div className="image-grid product-list">
        {products ? products.map((product, index)=>{
            {console.log(product.name)}
            return (
                <div className="product-card product-container">
            <ProductCard
                
                key={index} 
                name={product.name}
                image={product.images[0]}
                price={product.price}
        
            /></div>
            )
        }):<></>}
        </div>
    )
}

export default ImageList;