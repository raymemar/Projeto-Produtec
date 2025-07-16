import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../ADM/AuthContext';
import LoginPopup from './LoginPopup';
import './Footer.css';

export default function Footer({ onLoginClick }) {
  const { isAuthenticated, logout } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  
  const handleLogoutClick = () => logout();
  
  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      // Fallback: abrir popup próprio
      setIsLoginPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
  };
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          <h1 className="footer-logo-text">Projeto</h1>
          <h2 className="footer-logo-subtext">PRODUTEC</h2>
        </div>

        <div className="footer-nav">
          <div className="nav-column">
            <h4 className="nav-column-title">Navegação</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/carnauba">Carnaúba</Link>
              </li>
              <li>
                <Link to="/arvores-nativas">Árvores Nativas</Link>
              </li>
              <li>
                <Link to="/agentes">Agentes</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
            </ul>
          </div>

          <div className="nav-column">
            <h4 className="nav-column-title">Acesse também</h4>
            <div className="social-links">
              <a
                href="https://www.instagram.com/produtec2025/"
                className="social-link"
              >
                <img
                  src="/Vector_insta.png"
                  alt="Instagram"
                  className="social-icon"
                />{' '}
                Instagram
              </a>
              <a href="#" className="social-link">
                <img
                  src="/Vector_youtube.png"
                  alt="Youtube"
                  className="social-icon"
                />{' '}
                Youtube
              </a>
            </div>
          </div>
        </div>

        <div className="footer-button">
          {isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogoutClick}>
              <span className="button-text">Sair</span>
            </button>
          ) : (
            <button className="login-btn" onClick={handleLoginClick}>
              <span className="button-text">Login Adm</span>
            </button>
          )}
        </div>
      </div>

      {/* Popup de Login próprio do Footer */}
      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={handleClosePopup} 
      />
    </footer>
  );
}
