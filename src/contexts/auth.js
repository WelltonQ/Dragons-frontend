import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recovered = localStorage.getItem('user');

        if(recovered) {
            setUser(JSON.parse(recovered))
        }

        setLoading(false)
    }, [])

    const login = (email, password) => {
        const logged = {
            email,
            password
        }

        localStorage.setItem('user', JSON.stringify(logged))

        if (email === 'wellton@sicredi.com' && password === '123456') {
            setUser(logged);
            navigate('/dragons')
        } else {
            alert('Usuário ou senha incorreta!')
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}