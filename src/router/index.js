import { Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Cart from '../Pages/Cart';
import Checkout from '../Pages/Checkout';
import MyOrders from '../Pages/MyOrders';

const AppRouter = ({ addToCart, cartItems  }) => {

  return (
    
      <Routes>
        <Route path="/" exact element={<Home addToCart={addToCart} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
  );
}

export default AppRouter;
