import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import styles from './styles.module.scss';

export function Login() {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    console.log({email, password})

    login(email, password)
  }

  return (
    <section className={styles.section}>
        <form onSubmit={onSubmit}>
            <label htmlFor="email">E-mail</label>
            <input 
              name="email" 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <label htmlFor="password">Senha</label>
            <input 
              name="password" 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
        </form>
    </section>
  );
}
