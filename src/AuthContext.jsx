import React, { createContext, useContext, useState, useEffect } from 'react';

// Contexto de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Credenciais fake para teste
  const FAKE_CREDENTIALS = {
    username: 'adm-fulano',
    password: '12345adm'
  };

  // Verificar se há sessão salva no localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('produtec_auth');
    const savedUser = localStorage.getItem('produtec_user');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Função de login fake
  const login = (username, password) => {
    if (username === FAKE_CREDENTIALS.username && password === FAKE_CREDENTIALS.password) {
      const userData = {
        id: 1,
        username: username,
        name: 'Administrador Fulano',
        role: 'admin'
      };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      // Salvar no localStorage para manter a sessão
      localStorage.setItem('produtec_auth', 'true');
      localStorage.setItem('produtec_user', JSON.stringify(userData));
      
      return { success: true, message: 'Login realizado com sucesso!' };
    } else {
      return { success: false, message: 'Usuário ou senha incorretos!' };
    }
  };

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('produtec_auth');
    localStorage.removeItem('produtec_user');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
