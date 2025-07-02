import React from 'react';
import { useAuth } from '../ADM/AuthContext';
import { useNavigate } from 'react-router-dom';
import contentManager from '../utils/contentManager';
import './AdminBar.css';

const AdminBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('Logout realizado com sucesso!');
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const clearAllData = () => {
    if (window.confirm('ATENÇÃO: Isso irá apagar todos os dados editados (textos e fotos). Tem certeza?')) {
      const success = contentManager.clearAllData();
      if (success) {
        alert(' Todos os dados foram resetados!');
        window.location.reload();
      } else {
        alert('Erro ao resetar dados. Tente novamente.');
      }
    }
  };

  const exportData = () => {
    try {
      const data = contentManager.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `produtec-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('✅ Backup dos dados criado com sucesso!');
    } catch (error) {
      alert('❌ Erro ao exportar dados.');
      console.error(error);
    }
  };

  return (
    <div className="admin-bar">
      <div className="admin-bar-content">
        <div className="admin-info">
          <span className="admin-icon">👨‍💼</span>
          <span className="admin-text">
            Modo Administrador - <strong>{user?.name || user?.username}</strong>
          </span>
          <span className="edit-mode-badge">Modo Edição Ativo</span>
        </div>
        
        <div className="admin-actions">
          <button 
            onClick={handleGoToAdmin} 
            className="admin-btn admin-panel-btn"
            title="Ir para o painel administrativo"
          >
            📊 Painel
          </button>
          
          <button 
            onClick={exportData} 
            className="admin-btn export-btn"
            title="Exportar backup dos dados"
          >
            💾 Backup
          </button>
          
          <button 
            onClick={clearAllData} 
            className="admin-btn reset-btn"
            title="Resetar todos os dados editados"
          >
            🔄 Reset
          </button>
          
          <button 
            onClick={handleLogout} 
            className="admin-btn logout-btn"
            title="Sair do modo administrador"
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
