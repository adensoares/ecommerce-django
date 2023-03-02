import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from "axios";


import { FaShoppingCart } from "react-icons/fa";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';

const Header = ({ cartLength }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    axios.defaults.headers.common['Authorization'] = ""
  }  


const [user, setUser] = useState(null);
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen(!dropdownOpen);


useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/users/me');
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };  
  fetchUser();
}, []);

const handleLogout = async () => {
  try {
    const response = await axios.post('/api/auth/token/logout/');
    if (response.status === 204) {
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete axios.defaults.headers.common['Authorization'];
      navigate('/sign-in');
    } else {
      console.error(`Request failed with status code ${response.status}`);
    }
    
  } catch (error) {
    console.error(error);
  }
};
 
  return (
    <Container  >
        <Navbar expand="md" style={{ height: '10vh' }} >
            <NavbarBrand href="/" >
            eCommerce - Django
            </NavbarBrand>
            <Nav className="ms-auto " navbar>

            {user ? (
              <>
                <NavItem className="mx-2">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle nav caret>
                      Olá, {user.username}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/my-orders">Meus Pedidos</DropdownItem>
                      <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </>
            ) : (
              <NavItem className="mx-2">
              <Link to="/sign-in">
                <Button color="dark">Entrar</Button>
              </Link>
            </NavItem>
            )}
              <NavItem>
                <Link to="/cart">
                  <Button  outline color="dark"><FaShoppingCart /> Carrinho </Button>
                </Link>
              </NavItem>
              
            </Nav>
        </Navbar>
    </Container>
   

  );
};

export default Header;
