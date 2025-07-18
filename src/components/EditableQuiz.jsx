import React, { useState, useEffect } from 'react';
import { useAuth } from '../ADM/AuthContext';
import './EditableQuiz.css';

const EditableQuiz = ({ pergunta, opcoes, resposta, onSave, perguntaIndex }) => {
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
                            💾 Salvar Alterações
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="cancel-btn"
                            type="button"
                            style={{ background: '#dc3545', color: 'white', padding: '15px 30px', fontSize: '16px', fontWeight: 'bold' }}
                        >
                            ❌ Cancelar Edição
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
        </div>
    );
};

export default EditableQuiz;
