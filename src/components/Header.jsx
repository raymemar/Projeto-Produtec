import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../ADM/AuthContext';
import './Header.css';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1 className="logo-text">Projeto</h1>
          <h2 className="logo-subtext">PRODUTEC</h2>
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Sobre Nós</Link>
          <Link to="/carnauba" className="nav-link">Carnaúba</Link>
          <Link to="/arvores-nativas" className="nav-link">Árvores Nativas</Link>
          <Link to="/agentes" className="nav-link">Agentes</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          {isAuthenticated && (
            <Link to="/gerenciador-agentes" className="nav-link admin-link">Gerenciar Agentes</Link>
          )}
        </nav>
      </div>
    </header>
  );
}