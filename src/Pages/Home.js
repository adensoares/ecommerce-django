import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardFooter,
  Button,
  NavLink,
  Container
} from 'reactstrap';


const Home = () => {
    const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);


  useEffect(() => {

      const fetchProducts = async () => {
        try {
          const response = await axios.get('/api/products/');
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchCategories = async () => {
          try {
            const response = await axios.get('/api/categories/');
            setCategories(response.data);
          } catch (error) {
            console.error(error);
          }
        };
  
        
      fetchCategories();
      fetchProducts();
    }, []);


    const addToCart = async(product) => {

      const existingCartItem = cartItems.find((item) => item.product.id === product.id);
      if (existingCartItem) {
        await setCartItems(
          cartItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: parseInt(item.quantity) + 1 } : item
          )
        );
      } else {
        await setCartItems([...cartItems, { product: product, quantity: 1 }]);
      }
      navigate("/cart");      
    };
  
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('localStorage do HOME:', cartItems);

    }, [cartItems]);
    
    
  
    
  return (
    <div className="d-flex flex-column" >
        <section className="bg-dark py-5">
        <Container>
            <h2 className="text-white float-start">Vinhos</h2>
        </Container>
        </section>

        <Container className="mt-5 mb-5">
            <Row className="flex-grow-1">
                <Col xs="2" >
                    <h4 style={{ textAlign: 'left' }}>Categorias</h4>
                    <ul className="list-unstyled">
                    {categories.map((category) => (
                <li key={category.id} className="mt-3">
                  <NavLink
                    href={`/categories/${category.slug}`}
                    style={{ textDecoration: 'none', textAlign: 'left' }}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
                    </ul>
                </Col>
                <Col xs="10">
                    <Row xs="1" sm="2" md="3" lg="3">
                        {products.map((product) => (
                        <Col xs="4" key={product.id} className="mb-4">
                            <Card style={{minHeight: '500px'}} >
                                <CardImg top style={{ height: '250px', objectFit: 'contain'  }} src={product.get_image} alt={product.name} />
                                <CardBody className="">
                                <CardTitle tag="h5" style={{ textAlign: 'left' }}>{product.name}</CardTitle>
                                <CardSubtitle tag="h6" className="text-muted mt-2 mb-4" style={{ textAlign: 'left' }}>
                                    <strong>R$ {product.price} </strong> <del> {(parseFloat(product.price) + 70).toFixed(2)}</del>
                                </CardSubtitle>
                                <CardText style={{ textAlign: 'justify' }}>{product.description}</CardText>
                                </CardBody>
                                <CardFooter>
                                    <Button color="dark" onClick={() => addToCart(product)}>Adicionar ao Carrinho</Button>
                               </CardFooter>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>

    </div>
  );
};

export default Home;
