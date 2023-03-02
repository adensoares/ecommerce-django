import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";


import React, { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './router';

function App() {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const cartLength = cartItems.length
  console.log("Cart Lenght:", cartLength);

  return (

    <div className="App">
    <Router>
      <Header cartLength={cartLength} />
      <AppRouter addToCart={addToCart} cartItems={cartItems} />
      <Footer />
    </Router>

    </div>
  );
}

export default App;
