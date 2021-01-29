import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuDrawer from './components/MenuDrawer';
import MyCustomTheme from './components/Theme';
// pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <MyCustomTheme>
    <Router>
      <MenuDrawer/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/about"></Route>
        <Route path="/account"></Route>
        <Route path="/cart"></Route>
        <Route path="/login"></Route>
        <Route exact path="/products/:id"><ProductPage/></Route>
      </Switch>
    </Router>
    </MyCustomTheme>
  );
}

export default App;
