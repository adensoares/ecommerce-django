import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        try {
          const response = await axios.get('/api/auth/users/me');
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate('/sign-in');
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated ? children : null;
};

export default Authentication;
