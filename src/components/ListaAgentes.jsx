import React, { useState, useEffect } from 'react';
import { AgentesService } from '../services/agentesService';
import './ListaAgentes.css';

const ListaAgentes = () => {
  const [agentes, setAgentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    carregarAgentes();
  }, []);

  const carregarAgentes = async () => {
    setLoading(true);
    try {
      const resultado = await AgentesService.listarAgentes();
      if (resultado.success) {
        setAgentes(resultado.agentes);
      } else {
        setError(resultado.message || 'Erro ao carregar agentes');
      }
    } catch (err) {
      setError('Erro ao carregar agentes');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const excluirAgente = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o agente ${nome}?`)) {
      try {
        const resultado = await AgentesService.excluirAgente(id);
        if (resultado.success) {
          setAgentes(agentes.filter(agente => agente.id !== id));
          alert('Agente excluído com sucesso!');
        } else {
          alert(resultado.message || 'Erro ao excluir agente');
        }
      } catch (err) {
        alert('Erro ao excluir agente');
        console.error('Erro:', err);
      }
    }
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return 'N/A';
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const agentesFiltrados = agentes.filter(agente => 
    agente.nome?.toLowerCase().includes(filtro.toLowerCase()) ||
    agente.email?.toLowerCase().includes(filtro.toLowerCase()) ||
    agente.cidade?.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <div className="lista-agentes-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Carregando agentes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-agentes-container">
        <div className="error-state">
          <p className="error-message">{error}</p>
          <button onClick={carregarAgentes} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-agentes-container">
      <div className="lista-header">
        <h2>Agentes Cadastrados</h2>
        <div className="lista-stats">
          <span className="total-agentes">
            Total: {agentes.length} agente{agentes.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="lista-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome, email ou cidade..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={carregarAgentes} className="refresh-button">
          Atualizar Lista
        </button>
      </div>

      {agentesFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>
            {filtro ? 'Nenhum agente encontrado com esse filtro.' : 'Nenhum agente cadastrado ainda.'}
          </p>
        </div>
      ) : (
        <div className="agentes-grid">
          {agentesFiltrados.map((agente) => (
            <div key={agente.id} className="agente-card">
              <div className="agente-header">
                <h3 className="agente-nome">{agente.nome}</h3>
                <div className="agente-actions">
                  <button
                    onClick={() => excluirAgente(agente.id, agente.nome)}
                    className="delete-button"
                    title="Excluir agente"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="agente-info">
                <div className="info-item">
                  <strong>Email:</strong> {agente.email}
                </div>
                <div className="info-item">
                  <strong>Telefone:</strong> {agente.telefone}
                </div>
                <div className="info-item">
                  <strong>Cidade:</strong> {agente.cidade}
                  {agente.estado && ` - ${agente.estado}`}
                </div>
                {agente.disponibilidade && (
                  <div className="info-item">
                    <strong>Disponibilidade:</strong> {agente.disponibilidade}
                  </div>
                )}
                {agente.motivacao && (
                  <div className="info-item">
                    <strong>Motivação:</strong> 
                    <p className="motivacao-text">{agente.motivacao}</p>
                  </div>
                )}
                {agente.experiencia && (
                  <div className="info-item">
                    <strong>Experiência:</strong> 
                    <p className="experiencia-text">{agente.experiencia}</p>
                  </div>
                )}
                <div className="info-item">
                  <strong>Cadastrado em:</strong> {formatarData(agente.dataCadastro)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaAgentes;
