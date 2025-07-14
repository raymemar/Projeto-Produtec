import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Componente para proteger rotas que requerem autenticação
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostrar carregamento enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Carregando...
      </div>
    );
  }

  // Se não estiver autenticado, redirecionar para home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado, renderizar o componente
  return children;
};

export default ProtectedRoute;
