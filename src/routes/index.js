import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Dragons } from '../pages/Dragons';
import { Details } from '../pages/Details';
import { AuthProvider, AuthContext } from '../contexts/auth';

export function AllRoutes() {

    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if(loading) {
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to='/'/>
        }

        return children;
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" exact element={<Login/>} />
                    <Route
                        path="/dragons"
                        exact
                        element={
                            <Private>
                                <Dragons/>
                            </Private>
                        }
                    />
                    <Route
                        path="/dragons/:id"
                        exact
                        element={
                            <Private>
                                <Details/>
                            </Private>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
