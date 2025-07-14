import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import contentManager from '../utils/contentManager';
import './ADM.css';

const ADM = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  // Carregar estatísticas ao montar o componente
  useEffect(() => {
    const loadStats = () => {
      const currentStats = contentManager.getStats();
      setStats(currentStats);
    };
    
    loadStats();
    // Atualizar estatísticas a cada 10 segundos
    const interval = setInterval(loadStats, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="adm-container">
      <header className="adm-header">
        <div className="adm-header-content">
          <h1>Painel Administrativo - PRODUTEC</h1>
          <div className="admin-info">
            <span>Bem-vindo, {user?.name || user?.username}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="adm-main">
        <div className="adm-content">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3>Dashboard</h3>
              <p>Visualizar estatísticas e métricas do sistema</p>
              <button className="card-button">Acessar</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📝</div>
              <h3>Gerenciar Conteúdo</h3>
              <p>Editar textos, imagens e informações do site</p>
              <button className="card-button">Editar</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🧪</div>
              <h3>Quiz Científico</h3>
              <p>Gerenciar perguntas e respostas do quiz</p>
              <button className="card-button">Gerenciar</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📰</div>
              <h3>Notícias</h3>
              <p>Publicar e editar notícias do Ceará Científico</p>
              <button className="card-button">Ver Notícias</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">👥</div>
              <h3>Usuários</h3>
              <p>Gerenciar participantes e administradores</p>
              <button className="card-button">Gerenciar</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⚙️</div>
              <h3>Configurações</h3>
              <p>Ajustar configurações gerais do sistema</p>
              <button className="card-button">Configurar</button>
            </div>
          </div>

          <div className="quick-stats">
            <h2>Estatísticas do Sistema</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{stats?.editedTexts || 0}</div>
                <div className="stat-label">Textos Editados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats?.totalPhotos || 0}</div>
                <div className="stat-label">Fotos na Galeria</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats?.dataSize || 0}</div>
                <div className="stat-label">Bytes de Dados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {stats?.lastUpdate ? 
                    new Date(stats.lastUpdate).toLocaleDateString('pt-BR') : 
                    'Nunca'
                  }
                </div>
                <div className="stat-label">Última Atualização</div>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Atividade Recente</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <div className="activity-title">Conteúdo da página inicial atualizado</div>
                  <div className="activity-time">Há 2 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🧪</div>
                <div className="activity-content">
                  <div className="activity-title">Novo quiz adicionado: "Química Orgânica"</div>
                  <div className="activity-time">Há 5 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📰</div>
                <div className="activity-content">
                  <div className="activity-title">Notícia publicada: "Feira de Ciências 2025"</div>
                  <div className="activity-time">Há 1 dia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ADM;