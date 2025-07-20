import React, { useState } from 'react';
import './AddTreeForm.css';

const AddTreeForm = ({ isOpen, onClose, onAddTree }) => {
  const [newTree, setNewTree] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleImageUrlChange = (url) => {
    setNewTree({ ...newTree, imageUrl: url });
    if (url) {
      setPreviewImage(url);
    } else {
      setPreviewImage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTree.name && newTree.description && newTree.imageUrl) {
      const treeToAdd = {
        name: newTree.name,
        description: newTree.description,
        imageUrl: newTree.imageUrl
      };
      onAddTree(treeToAdd);
      handleReset();
      onClose();
    } else {
      alert('Por favor, preencha todos os campos: Nome da árvore, descrição e URL da imagem!');
    }
  };

  const handleReset = () => {
    setNewTree({
      name: '',
      description: '',
      imageUrl: ''
    });
    setPreviewImage('');
    setShowImageInput(false);
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NiA4NEMzNi44NjI5IDg0IDEzLjUgMTA3LjM2MyAxMy41IDEzNi41UzM2Ljg2MjkgMTg5IDY2IDE4OSA4My44NjI5IDE2NS42MzcgODMuODYyOSAxMzYuNVM2MC42MzcxIDg0IDY2IDg0WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMTE2IDEwMkMxMDIuNzQ1IDEwMiA5MiAxMTIuNzQ1IDkyIDEyNlM3Mi4yNTUgMTUwIDg2IDE1MFMxMDAgMTM5LjI1NSAxMDAgMTI2IDEwOS4yNTUgMTAyIDExNiAxMDJaIiBmaWxsPSIjRDlEOUQ5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjU2NTY1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbSBuJiM5NzE7byBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K';
    e.target.alt = 'Imagem não encontrada';
  };

  if (!isOpen) return null;

  return (
    <div className="add-tree-popup-overlay" onClick={handleCancel}>
      <div className="add-tree-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h4>Adicionar Nova Árvore</h4>
          <button 
            onClick={handleCancel} 
            className="close-popup-btn"
            title="Fechar"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="tree-form">
          <div className="form-section">
            <label>Nome da Árvore</label>
            <input
              type="text"
              placeholder="Digite o nome da árvore"
              value={newTree.name}
              onChange={(e) => setNewTree({...newTree, name: e.target.value})}
              className="input-field"
              required
            />
          </div>

          <div className="form-section">
            <label>Adicione uma imagem</label>
            {!previewImage ? (
              <div className="image-upload-area" onClick={() => setShowImageInput(true)}>
                <div className="upload-placeholder">
                  <span className="plus-icon">+</span>
                </div>
              </div>
            ) : (
              <div className="image-preview-container">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="preview-image-display"
                  onError={handleImageError}
                />
                <button 
                  type="button" 
                  onClick={() => {
                    setPreviewImage('');
                    setNewTree({...newTree, imageUrl: ''});
                    setShowImageInput(true);
                  }}
                  className="change-image-btn"
                >
                  Trocar imagem
                </button>
              </div>
            )}
            
            {showImageInput && (
              <div className="url-input-section">
                <input
                  type="url"
                  placeholder="Cole aqui o link da imagem"
                  value={newTree.imageUrl}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="url-input-field"
                  autoFocus
                />
                <div className="url-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowImageInput(false)}
                    className="url-cancel-btn"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (newTree.imageUrl) {
                        setShowImageInput(false);
                      }
                    }}
                    className="url-confirm-btn"
                    disabled={!newTree.imageUrl}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <label>Descrição</label>
            <textarea
              placeholder="Descreva as características da árvore"
              value={newTree.description}
              onChange={(e) => setNewTree({...newTree, description: e.target.value})}
              className="textarea-field"
              rows={4}
              required
            />
          </div>
          
          <div className="popup-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="add-btn">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreeForm;
