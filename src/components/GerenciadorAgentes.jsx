import React, { useState, useEffect } from 'react';
import { AgentesService } from '../services/agentesService';
import Header from './Header';
import Footer from './Footer';
import './GerenciadorAgentes.css';

const GerenciadorAgentes = () => {
    const [agentes, setAgentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filtro, setFiltro] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('pendente');

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

    const aprovarAgente = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja aprovar o agente ${nome}?`)) {
            try {
                const resultado = await AgentesService.atualizarStatusAgente(id, 'aprovado');
                if (resultado.success) {
                    setAgentes(agentes.map(agente =>
                        agente.id === id ? { ...agente, status: 'aprovado' } : agente
                    ));
                    alert('Agente aprovado com sucesso!');
                } else {
                    alert(resultado.message || 'Erro ao aprovar agente');
                }
            } catch (err) {
                alert('Erro ao aprovar agente');
                console.error('Erro:', err);
            }
        }
    };

    const rejeitarAgente = async (id, nome) => {
        const motivo = window.prompt(`Por que você está rejeitando o agente ${nome}?`);
        if (motivo) {
            try {
                const resultado = await AgentesService.atualizarStatusAgente(id, 'rejeitado', motivo);
                if (resultado.success) {
                    setAgentes(agentes.map(agente =>
                        agente.id === id ? { ...agente, status: 'rejeitado', motivoRejeicao: motivo } : agente
                    ));
                    alert('Agente rejeitado com sucesso!');
                } else {
                    alert(resultado.message || 'Erro ao rejeitar agente');
                }
            } catch (err) {
                alert('Erro ao rejeitar agente');
                console.error('Erro:', err);
            }
        }
    };

    const formatarData = (dataISO) => {
        if (!dataISO) return 'N/A';
        try {
            return new Date(dataISO).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (err) {
            return 'Data inválida';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'aprovado': return '#28a745';
            case 'rejeitado': return '#dc3545';
            default: return '#ffc107';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'aprovado': return 'Aprovado';
            case 'rejeitado': return 'Rejeitado';
            default: return 'Pendente';
        }
    };

    const agentesFiltrados = agentes.filter(agente => {
        const matchNome = agente.nome.toLowerCase().includes(filtro.toLowerCase());
        const matchStatus = filtroStatus === 'todos' || agente.status === filtroStatus || (!agente.status && filtroStatus === 'pendente');
        return matchNome && matchStatus;
    });

    if (loading) {
        return (
            <div className="gerenciador-container">
                <div className="loading">Carregando agentes...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="gerenciador-container">
                <div className="error">
                    <p>Erro: {error}</p>
                    <button onClick={carregarAgentes} className="retry-btn">
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="gerenciador-page">
            <Header />

            <div className="gerenciador-container">
                <div className="gerenciador-header">
                    <h2>Gerenciamento de Agentes</h2>
                    <p>Aprove ou rejeite as solicitações de cadastro de agentes</p>
                </div>

                <div className="gerenciador-filters">
                    <div className="filter-group">
                        <label htmlFor="filtro-nome">Buscar por nome:</label>
                        <input
                            id="filtro-nome"
                            type="text"
                            placeholder="Digite o nome do agente..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="filtro-status">Status:</label>
                        <select
                            id="filtro-status"
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="pendente">Pendentes</option>
                            <option value="aprovado">Aprovados</option>
                            <option value="rejeitado">Rejeitados</option>
                            <option value="todos">Todos</option>
                        </select>
                    </div>

                    <button onClick={carregarAgentes} className="refresh-btn">
                        Atualizar
                    </button>
                </div>

                <div className="agentes-stats">
                    <div className="stat-card">
                        <div className="stat-number">{agentes.filter(a => !a.status || a.status === 'pendente').length}</div>
                        <div className="stat-label">Pendentes</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{agentes.filter(a => a.status === 'aprovado').length}</div>
                        <div className="stat-label">Aprovados</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{agentes.filter(a => a.status === 'rejeitado').length}</div>
                        <div className="stat-label">Rejeitados</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{agentes.length}</div>
                        <div className="stat-label">Total</div>
                    </div>
                </div>

                {agentesFiltrados.length === 0 ? (
                    <div className="empty-state">
                        <p>Nenhum agente encontrado com os filtros aplicados.</p>
                    </div>
                ) : (
                    <div className="agentes-table-container">
                        <table className="agentes-table">
                            <thead>
                                <tr>
                                    <th>Cadastro</th>
                                    <th>Nome completo</th>
                                    <th>Contato</th>
                                    <th>Série</th>
                                    <th>Escola</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agentesFiltrados.map((agente, index) => (
                                    <tr key={agente.id || index}>
                                        <td>
                                            <div className="cadastro-info">
                                                <strong>ID {String(index + 1).padStart(2, '0')}</strong>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="nome-info">
                                                <strong>{agente.nome}</strong>
                                                <small>{formatarData(agente.dataCadastro)}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="contato-info">
                                                <div>{agente.telefone}</div>
                                                <div>{agente.email}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="serie-badge">{agente.serie}</span>
                                        </td>
                                        <td>
                                            <div className="escola-info">
                                                <strong>{agente.escola}</strong>
                                                <small>{agente.cidadeEscola}</small>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(agente.status) }}
                                            >
                                                {getStatusText(agente.status)}
                                            </span>
                                            {agente.status === 'rejeitado' && agente.motivoRejeicao && (
                                                <div className="motivo-rejeicao" title={agente.motivoRejeicao}>
                                                    <small>Motivo: {agente.motivoRejeicao}</small>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {(!agente.status || agente.status === 'pendente') && (
                                                    <>
                                                        <button
                                                            onClick={() => aprovarAgente(agente.id, agente.nome)}
                                                            className="action-btn approve-btn"
                                                            title="Aprovar agente"
                                                        >
                                                            ✓
                                                        </button>
                                                        <button
                                                            onClick={() => rejeitarAgente(agente.id, agente.nome)}
                                                            className="action-btn reject-btn"
                                                            title="Rejeitar agente"
                                                        >
                                                            ✗
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        const detalhes = `
                                                            Nome: ${agente.nome}
                                                            Email: ${agente.email}
                                                            Telefone: ${agente.telefone}
                                                            Série: ${agente.serie}
                                                            Escola: ${agente.escola}
                                                            Cidade: ${agente.cidadeEscola}
                                                            Motivação: ${agente.motivacao}
                                                            Cadastrado em: ${formatarData(agente.dataCadastro)}
                                                            Status: ${getStatusText(agente.status)}
                                                                                    `;
                                                        alert(detalhes);
                                                    }}
                                                    className="action-btn info-btn"
                                                    title="Ver detalhes"
                                                >
                                                    👁️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="gerenciador-footer">
                    <p>Total de {agentesFiltrados.length} agente(s) encontrado(s)</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GerenciadorAgentes;