import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import MyCustomTheme from './components/Theme';
// pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import './components/styles/style.scss';

function App() {
  return (
    <MyCustomTheme>
    <Router>
      <MenuDrawer/>
      <Switch>
        <Route exact path={["/","/products"]}><Home/></Route>
        <Route exact path="/about"></Route>
        <Route exact path="/account"></Route>
        <Route exact path="/cart"></Route>
        <Route exact path="/login"></Route>
        <Route exact path="/products/:id"><ProductPage/></Route>
      </Switch>
    </Router>
    </MyCustomTheme>
  );
}

export default App;
