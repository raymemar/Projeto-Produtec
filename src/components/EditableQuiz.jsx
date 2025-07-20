import React, { useState, useEffect } from 'react';
import { useAuth } from '../ADM/AuthContext';
import './EditableQuiz.css';

const EditableQuiz = ({ pergunta, opcoes, resposta, onSave, perguntaIndex, onNext, onPrevious, totalPerguntas }) => {
    const { isAuthenticated } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedPergunta, setEditedPergunta] = useState(pergunta);
    const [editedOpcoes, setEditedOpcoes] = useState(opcoes);
    const [editedResposta, setEditedResposta] = useState(resposta);

    useEffect(() => {
        setEditedPergunta(pergunta);
        setEditedOpcoes(opcoes);
        setEditedResposta(resposta);
    }, [pergunta, opcoes, resposta]);

    const handleSave = () => {
        onSave(perguntaIndex, {
            pergunta: editedPergunta,
            opcoes: editedOpcoes,
            resposta: editedResposta
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedPergunta(pergunta);
        setEditedOpcoes(opcoes);
        setEditedResposta(resposta);
        setIsEditing(false);
    };

    const handleOpcaoChange = (index, value) => {
        const newOpcoes = [...editedOpcoes];
        newOpcoes[index] = value;
        setEditedOpcoes(newOpcoes);
    };

    if (!isAuthenticated) {
        return (
            <div className="question-container">
                <h3>{pergunta}</h3>
                <div className="options-container">
                    {opcoes.map((opcao, i) => (
                        <div key={i} className="option-display">
                            {opcao}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="question-container editing">
                <div className="edit-section">
                    <label>Pergunta:</label>
                    <textarea
                        value={editedPergunta}
                        onChange={(e) => setEditedPergunta(e.target.value)}
                        className="edit-question"
                        rows="3"
                    />
                </div>

                <div className="edit-section">
                    <label>Opções:</label>
                    {editedOpcoes.map((opcao, i) => (
                        <div key={i} className="edit-option">
                            <input
                                type="text"
                                value={opcao}
                                onChange={(e) => handleOpcaoChange(i, e.target.value)}
                                className="edit-option-input"
                            />
                        </div>
                    ))}
                </div>

                <div className="edit-section">
                    <label>Resposta correta:</label>
                    <select
                        value={editedResposta}
                        onChange={(e) => setEditedResposta(e.target.value)}
                        className="edit-answer-select"
                    >
                        {editedOpcoes.map((opcao, i) => (
                            <option key={i} value={opcao}>
                                {opcao}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="edit-buttons-container">
                    <div className="edit-buttons">
                        <button 
                            onClick={handleSave} 
                            className="save-btn"
                            type="button"
                            style={{ background: '#28a745', color: 'white', padding: '15px 30px', fontSize: '16px', fontWeight: 'bold' }}
                        >
                             Salvar 
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="cancel-btn"
                            type="button"
                            style={{ background: '#dc3545', color: 'white', padding: '15px 30px', fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="question-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#333' }}>
            <div className="question-header">
                <h3 style={{ color: '#333', fontWeight: '600' }}>{pergunta}</h3>
                <button
                    onClick={() => setIsEditing(true)}
                    className="edit-question-btn"
                >
                    Editar Pergunta
                </button>
            </div>
            <div className="options-container">
                {opcoes.map((opcao, i) => (
                    <div key={i} className="option-display" style={{ color: '#333' }}>
                        {opcao}
                        {opcao === resposta && (
                            <span className="correct-indicator">✓ Correta</span>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Botões de navegação */}
            <div className="navigation-buttons" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '20px', 
                padding: '15px 0',
                borderTop: '1px solid #ddd'
            }}>
                <button
                    onClick={onPrevious}
                    disabled={perguntaIndex === 0}
                    className="nav-btn prev-btn"
                    style={{
                        background: perguntaIndex === 0 ? '#ccc' : '#637d94ff',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        cursor: perguntaIndex === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                >
                    ← Pergunta Anterior
                </button>
                
                <span style={{ 
                    color: '#666', 
                    fontSize: '14px', 
                    fontWeight: '500' 
                }}>
                    {perguntaIndex + 1} de {totalPerguntas}
                </span>
                
                <button
                    onClick={onNext}
                    disabled={perguntaIndex === totalPerguntas - 1}
                    className="nav-btn next-btn"
                    style={{
                        background: perguntaIndex === totalPerguntas - 1 ? '#ccc' : '#007bff',
                        color: 'black',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '6px',
                        cursor: perguntaIndex === totalPerguntas - 1 ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Próxima Pergunta →
                </button>
            </div>
        </div>
    );
};

export default EditableQuiz;
