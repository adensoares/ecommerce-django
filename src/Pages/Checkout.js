import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

const Checkout = ({ cartItems, onClearCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();


  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);



    try {
      const response = await axios.post('/api/orders/create/', {
        name,
        email,
        phone,
        address,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      });

      onClearCart();
      setOrderId(response.data.id);
      navigate('/orders/success');
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <CardBody>
              <CardTitle tag="h4">Finalizar Pedido</CardTitle>
              <hr />

              {submitError && <Alert color="danger">{submitError}</Alert>}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Nome completo</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="phone">Telefone</Label>
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="address">Endereço</Label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <Button
                  type="submit"
                  color="dark"
                  className="mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Finalizar Pedido'}
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
