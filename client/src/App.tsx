import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
    <div>
      <Nav></Nav>
      <h1>Hello</h1>
    </div>
    </Router>
  );
}

export default App;
