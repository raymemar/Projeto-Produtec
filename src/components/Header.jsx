import React from 'react';
import EditableText from './EditableText';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <EditableText
            id="logo_projeto"
            initialText="Projeto"
            tag="h1"
            className="logo-text"
          />
          <EditableText
            id="logo_produtec"
            initialText="PRODUTEC"
            tag="h2"
            className="logo-subtext"
          />
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/carnauba" className="nav-link">Carnaúba</Link>
          <Link to="/arvores-nativas" className="nav-link">Árvores Nativas</Link>
          <Link to="/agentes" className="nav-link">Agentes</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
        </nav>
      </div>
    </header>
  );
}