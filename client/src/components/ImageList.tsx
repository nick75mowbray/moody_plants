import { ActionPictureInPicture } from 'material-ui/svg-icons';
import React, {ReactComponentElement, ReactNode, useEffect, useState} from 'react';
import ProductCard from './ProductCard';

// example data
interface image {
    name: string, 
    price: number, 
    image: string, 
    description: string,
    key: number
}



const ImageList = ()=> {

const [products, setProducts] = useState([]);

// load all products
useEffect(()=>{
    loadProducts();
}, []);

function loadProducts() {
    API.getProducts()
    .then(res => 
        setProducts(res.data))
        .catch(err=>console.error(err));
}

    return (
        <div className="image-grid product-list">
        {products ? products.map((product)=>{
            {console.log(product.name)}
            return (
                <div className="product-card product-container">
            <ProductCard
                
                key={product.key} 
                name={product.name}
                image={product.image}
                price={product.price}
                description={product.description}
            /></div>
            )
        }):<></>}
        </div>
    )
}

export default ImageList;