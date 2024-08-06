// src/components/User.js

import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const User = () => {
  const { userId } = useParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/auth/login-success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: userId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('user', data.token);          
          login(data);
        }
      });
  }, [userId, login]);

  return (
    <div>
      <h1>Loading...</h1>
      
    </div>
  );
};

export default User;
