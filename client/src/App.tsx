import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './components/Nav';
// pages
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Route exact path="/">
        <Home/>
        </Route>
      <Route path="/about"></Route>
      <Route path="/account"></Route>
      <Route path="/cart"></Route>
      <Route path="/login"></Route>
    </div>
    </Router>
  );
}

export default App;
