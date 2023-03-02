import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const Cart = (  ) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(cartItems);
  }, []);

  // Function to remove an item from the cart
  const removeItem =  (id) => {
      const newItems =  cartItems.filter((cartItem)  => {
      console.log('product.id:', cartItem.product.id);
      console.log('id:', id);
      return cartItem.product.id !== id;
    })
    console.log('newItems:', newItems);
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  // // Function to update the quantity of an item in the cart

  // Function to calculate the total cost of the items in the cart
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.product.price * cartItem.quantity;
    });
    return total;
  };
 
  const handleCheckout = async () => {
    try {
      // get the current user ID
      const response = await axios.get('api/auth/users/me/');
      const userId = response.data.id;
    
    
      // create the order object
      const order = {
        user: userId,
      };
    
      // make the POST request to create the order
      const orderResponse = await axios.post('/api/orders/', order);
      console.log('Order created:', orderResponse.data);
      
      // create an array of order items from the cart items
      const orderItems = cartItems.map(cartItem => ({
        order: orderResponse.data.id,
        product: cartItem.product.id,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      }));
      console.log('OrderItems:', orderItems);


      // create the order items
      const orderItemsResponse = await axios.post('/api/order-items/', orderItems);
      console.log('OrderItems created:', orderItemsResponse.data);

    
      // clear the cart and redirect the user to the order confirmation page
      localStorage.removeItem('cartItems');
      navigate('/my-orders');
    } catch (error) {
      console.error('Error creating order:', error);
      // display an error message to the user
    }
  };
  
  

  // Render the cart items
  return (
    <Container style={{minHeight: "80vh"}}>
      <Row>
        <Col>
          <h1>Meu Carrinho</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr key={cartItem.product.id}>
                  <td>{cartItem.product.name}</td>
                  <td>R$ {cartItem.product.price}</td>
                  <td>
                    {cartItem.quantity}
                  </td>
                  <td>R$ {((cartItem.product.price) * (cartItem.quantity)).toFixed(2) }</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => removeItem(cartItem.product.id)}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{textAlign: 'right'}}>
                  <strong>Total:</strong>
                </td>
                <td colSpan="1" >
                  <strong>R$ {calculateTotal().toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col >
          <Link to="/">
            <Button outline color="dark" className="mx-2">Continuar Comprando</Button>
          </Link>
          <Button color="dark" onClick={() => handleCheckout(cartItems)}> Finalizar Compra</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
