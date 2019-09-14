import React, { useState } from 'react';

import api from '../services/api';

import './Login.css';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      username,
    });

    console.log(response);

    history.push('/main');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo tindev" />
        <input
          placeholder="Digite seu Github User"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
