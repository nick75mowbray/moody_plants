import React, {useState, useEffect}from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import MyCustomTheme from './components/Theme';
// pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import './components/styles/style.scss';
import { commerce } from './lib/commerce';


function App() {

  const [commerceProducts, setCommerceProducts] = useState([]);
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setCommerceProducts(data);
  }

  useEffect(()=>{
    fetchProducts();
  }, []);

  return (
    <MyCustomTheme>
    <Router>
      <MenuDrawer/>
      <Switch>
        <Route exact path={["/","/products"]}>
          <Home commerceProducts={commerceProducts}/></Route>
        <Route exact path="/about"></Route>
        <Route exact path="/account"></Route>
        <Route exact path="/cart"></Route>
        <Route exact path="/login"></Route>
        <Route exact path="/products/:id"><ProductPage commerceProducts={commerceProducts}/></Route>
      </Switch>
      {console.log(commerceProducts)}
    </Router>
    </MyCustomTheme>
  );
}

export default App;
