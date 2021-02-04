import React, {useState, useEffect}from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import MyCustomTheme from './components/Theme';
// pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';

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
const [commerceProducts, setCommerceProducts] = useState([]);
const [sort, setSort] = useState('');

const handleChange = (event:any) => {
  setSort(event.target.value);
};
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
const [order, setOrder] = useState<any>({});
const [errorMessage, setErrorMessage] = useState('');

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

  const handleUpdateCartQty = async (productId:string, quantity:number) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId:string) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId:string, newOrder:any) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error){
      console.error(error);
      setErrorMessage(error.data.error.message);
    }
  }

  return (
    <MyCustomTheme>
    <Router>
      <MenuDrawer totalItems={cart.total_items}/>
      <Switch>
        <Route exact path={["/","/products"]}>
          <Home 
            commerceProducts={commerceProducts} 
            products={products}
            handleChange={handleChange}
            sort={sort}
            setSort={setSort}
            />
            </Route>
        <Route exact path="/about"></Route>
        <Route exact path="/account">
          <Account/>
        </Route>
        <Route exact path="/cart">
          <Cart 
            cart={cart} 
            products={products} 
            commerceProducts={commerceProducts}
            onUpdateCart={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            />
        </Route>
        <Route exact path="/login"></Route>
        <Route exact path="/logout"></Route>
        <Route exact path="/products/:id"><ProductPage commerceProducts={commerceProducts} onAddToCart={handleAddToCart}/></Route>
        <Route exact path="/checkout">
          <Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
        ></Checkout></Route>
      </Switch>
    </Router>
    </MyCustomTheme>
  );
}

export default App;
