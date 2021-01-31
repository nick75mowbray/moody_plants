import React, {useState, useEffect}from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import MyCustomTheme from './components/Theme';
// pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';

import './components/styles/style.scss';
import { commerce } from './lib/commerce';
import { cartInterface } from './utils/cartInterface';


import API from './utils/API';
import mongoose from 'mongoose';
import { commerceProductsInterface } from './utils/commerceProductsInterface';

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



const App = ()=> {

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


  const [commerceProducts, setCommerceProducts] = useState([]);
  const [cart, setCart] = useState<cartInterface>({
    id:"",
    created:0,
    updated:0,
    expires:0,
    total_items:0,
    total_unique_items:0,
    subtotal: {
        raw:0,
        formatted:"",
        formatted_with_symbol:"",
        formatted_with_code:""
    },
    discount_code:[],
    hosted_checkout_url:"",
    line_items: [{
      id:"",
        product_id:"",
        name:"",
        product_name:"",
        media:[],
        sku:"",
        permalink:"",
        quantity:0,
        price: {
            raw:0,
            formatted:"",
            formatted_with_symbol:"",
            formatted_with_code:""
            },
        line_total: {
            raw:0,
            formatted:"",
            formatted_with_symbol:"",
            formatted_with_code:""
            },
        variants:[]
    }],
    currency: {
        code:"",
        symbol:""
    }
  });
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setCommerceProducts(data);
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const handleAddToCart = async (productId:string, quantity:number) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  useEffect(()=>{
    fetchProducts();
    fetchCart();
  }, []);

  console.log(`cart: ${JSON.stringify(cart)}`);
  return (
    <MyCustomTheme>
    <Router>
      <MenuDrawer totalItems={cart.total_items}/>
      <Switch>
        <Route exact path={["/","/products"]}>
          <Home commerceProducts={commerceProducts} products={products}/></Route>
        <Route exact path="/about"></Route>
        <Route exact path="/account"></Route>
        <Route exact path="/cart">
          <Cart cart={cart} products={products} commerceProducts={commerceProducts}/>
        </Route>
        <Route exact path="/login"></Route>
        <Route exact path="/products/:id"><ProductPage commerceProducts={commerceProducts} onAddToCart={handleAddToCart}/></Route>
      </Switch>
    </Router>
    </MyCustomTheme>
  );
}

export default App;
