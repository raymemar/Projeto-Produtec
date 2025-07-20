import React, { useState } from 'react';
import './AddAgenteForm.css';

const AddAgenteForm = ({ isOpen, onClose, onSubmit }) => {
    const [agenteData, setAgenteData] = useState({
        nome: '',
        descricao: '',
        imageUrl: '',
    });
    const [previewImage, setPreviewImage] = useState('');

    const handleImageUrlChange = (url) => {
        setAgenteData({ ...agenteData, imageUrl: url });
        setPreviewImage(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agenteData.nome && agenteData.descricao && agenteData.imageUrl) {
            onSubmit(agenteData);
            setAgenteData({ nome: '', descricao: '', imageUrl: '' });
            setPreviewImage('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="add-agente-popup-overlay" onClick={onClose}>
            <div className="add-agente-popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h4>Adicionar Novo Agente</h4>
                    <button onClick={onClose} className="close-popup-btn">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="popup-content">
                    <div className="form-section">
                        <label>Nome do Agente *</label>
                        <input
                            type="text"
                            placeholder="Ex: Maria Silva"
                            value={agenteData.nome}
                            onChange={(e) => setAgenteData({ ...agenteData, nome: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>URL da Foto *</label>
                        <input
                            type="url"
                            placeholder="https://exemplo.com/foto.jpg"
                            value={agenteData.imageUrl}
                            onChange={(e) => handleImageUrlChange(e.target.value)}
                            required
                        />
                    </div>

                    {previewImage && (
                        <div className="image-preview">
                            <img src={previewImage} alt="Preview" />
                        </div>
                    )}

                    <div className="form-section">
                        <label>Descrição *</label>
                        <textarea
                            placeholder="Conte um pouco sobre o agente..."
                            value={agenteData.descricao}
                            onChange={(e) => setAgenteData({ ...agenteData, descricao: e.target.value })}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="submit-btn">Adicionar</button>
                        <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAgenteForm;