import React, {ReactComponentElement, ReactNode} from 'react';
import ProductCard from './ProductCard';

// example data
interface image {
    name: string, 
    price: number, 
    image: string, 
    description: string,
    key: number
}
const images: image[] = [{
    name: 'Monstera composition 1',
    price: 70,
    image: 'https://via.placeholder.com/400',
    description: 'example description blah blah',
    key: 1
},
{
    name: 'Monstera composition 1',
    price: 70,
    image: 'https://via.placeholder.com/400',
    description: 'example description blah blah',
    key: 2
},
{
    name: 'Monstera composition 1',
    price: 70,
    image: 'https://via.placeholder.com/400',
    description: 'example description blah blah',
    key: 3
},
{
    name: 'Monstera composition 1',
    price: 70,
    image: 'https://via.placeholder.com/400',
    description: 'example description blah blah',
    key: 4
},
];


const ImageList = ()=> {
    return (
        <div className="image-grid product-list">
        {images ? images.map((product)=>{
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