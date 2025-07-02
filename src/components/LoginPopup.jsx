import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../ADM/AuthContext';
import './LoginPopup.css';

const LoginPopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = login(username, password);
      
      if (result.success) {
        // Limpar campos
        setUsername('');
        setPassword('');
        onClose();
        
        // NÃO redirecionar - apenas fechar o popup e ativar modo de edição
        // navigate('/admin');  // Comentado - não redirecionar mais
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Erro interno. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Login Administrador</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="usuário"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="senha"
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          
          <div className="credentials-hint">
            <small>Teste: adm-fulano / 12345adm</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
