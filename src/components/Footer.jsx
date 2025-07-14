import { Link } from 'react-router-dom';
import { useAuth } from '../ADM/AuthContext';
export default function Footer() {
  const { isAuthenticated, logout } = useAuth();
  const handleLogoutClick = () => logout();
  const handleLoginClick = () => window.location.href = '/admin';
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>Projeto</h1>
          <h2>PRODUTEC</h2>
        </div>

        <div className="footer-nav">
          <div className="nav-column">
            <h4>Navegação</h4>
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
            <h4>Acesse também</h4>
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
              Sair
            </button>
          ) : (
            <button className="login-btn" onClick={handleLoginClick}>
              Login Adm
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
