import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('/api/auth/users/', { username, password });
        console.log(response.data);
        navigate("/sign-in");
      } catch (error) {
        console.error(error);
        // handle error here
      }
    };

    return (
      <Container style={{height:"80vh"}}>
        <Row className="justify-content-center">
          <Col sm="4" className="mt-5">
            <h1>Cadastrar</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Usuário</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Senha</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormGroup>
              <Button color="dark">Enviar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

export default SignUp;
