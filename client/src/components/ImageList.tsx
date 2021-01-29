import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
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
            return (
                <Link to={"/products/"+product._id}>
                    <div className="product-card product-container" key={index}>
                        <ProductCard
                            name={product.name}
                            image={product.images[0]}
                            price={product.price}
                            size={product.size}
                        />
                    </div>
                </Link>
                )
        }):<></>}
        </div>
    )
}

export default ImageList;