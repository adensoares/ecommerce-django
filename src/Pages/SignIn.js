import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "axios";

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

const SignIn = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignIn = async (event) => {
      event.preventDefault();
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem('access_token');

      try {
        const response = await axios.post('/api/auth/token/login/', {
          username,
          password
        });
        if (response.status === 200) {
          const token = response.data.auth_token;
          console.log(token)
          localStorage.setItem('access_token', token);
          axios.defaults.headers.common['Authorization'] = `Token ${token}`;
          navigate("/");
        } else {
          console.error(`Request failed with status code ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Container  style={{height:"80vh"}}>
        <Row className="justify-content-center">
          <Col sm="4" className="mt-5">
            <h1>Entrar</h1>
            <Form onSubmit={handleSignIn}>
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
              <Button color="dark">Entrar</Button>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

export default SignIn;
