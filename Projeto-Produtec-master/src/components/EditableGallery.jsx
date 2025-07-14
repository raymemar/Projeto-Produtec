import React, { useState, useEffect } from 'react';
import { useAuth } from '../ADM/AuthContext';
import EditableText from './EditableText';
import contentManager from '../utils/contentManager';
import './EditableGallery.css';

const EditableGallery = () => {
  const { isAuthenticated } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    src: '',
    alt: '',
    title: '',
    description: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  // Carregar fotos do contentManager
  useEffect(() => {
    const savedPhotos = contentManager.loadGallery();
    setPhotos(savedPhotos);
  }, []);

  // Salvar fotos usando contentManager
  const savePhotos = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    contentManager.saveGallery(updatedPhotos);
    contentManager.markUpdate();
  };

  // Validar URL da imagem e fazer preview
  const handleImageUrlChange = (url) => {
    setNewPhoto({ ...newPhoto, src: url });
    if (url) {
      setPreviewImage(url);
    } else {
      setPreviewImage('');
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto.src && newPhoto.title && newPhoto.description) {
      const photoToAdd = {
        id: Date.now(),
        src: newPhoto.src,
        alt: newPhoto.alt || newPhoto.title,
        title: newPhoto.title,
        description: newPhoto.description
      };
      savePhotos([...photos, photoToAdd]);
      setNewPhoto({ src: '', alt: '', title: '', description: '' });
      setPreviewImage('');
      setShowAddForm(false);
    } else {
      alert('Por favor, preencha pelo menos: URL da imagem, título e descrição!');
    }
  };

  const handleCancelAdd = () => {
    setNewPhoto({ src: '', alt: '', title: '', description: '' });
    setPreviewImage('');
    setShowAddForm(false);
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm('Tem certeza que deseja remover esta foto?')) {
      savePhotos(photos.filter(photo => photo.id !== id));
    }
  };

  const handleUpdateDescription = (id, newDescription) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === id ? { ...photo, description: newDescription } : photo
    );
    savePhotos(updatedPhotos);
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NiA4NEMzNi44NjI5IDg0IDEzLjUgMTA3LjM2MyAxMy41IDEzNi41UzM2Ljg2MjkgMTg5IDY2IDE4OSA4My44NjI5IDE2NS42MzcgODMuODYyOSAxMzYuNVM2MC42MzcxIDg0IDY2IDg0WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMTE2IDEwMkMxMDIuNzQ1IDEwMiA5MiAxMTIuNzQ1IDkyIDEyNlM3Mi4yNTUgMTUwIDg2IDE1MFMxMDAgMTM5LjI1NSAxMDAgMTI2IDEwOS4yNTUgMTAyIDExNiAxMDJaIiBmaWxsPSIjRDlEOUQ5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjU2NTY1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbSBuJiM5NzE7byBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K';
    e.target.alt = 'Imagem não encontrada';
  };

  return (
    <section className="galeria-section">
      <div className="gallery-header">
        <EditableText
          id="gallery_title"
          initialText="Nossa jornada em fotos"
          tag="h3"
          className="gallery-title"
        />
        {isAuthenticated && (
          <button 
            onClick={() => setShowAddForm(true)} 
            className="add-photo-btn"
            title="Adicionar nova foto"
          >
            Adicionar Foto
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="add-photo-popup-overlay" onClick={handleCancelAdd}>
          <div className="add-photo-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h4> Adicionar Nova Foto à Galeria</h4>
              <button 
                onClick={handleCancelAdd} 
                className="close-popup-btn"
                title="Fechar"
              >
                ✕
              </button>
            </div>
            
            <div className="popup-content">
              <div className="form-section">
                <label> URL da Imagem *</label>
                <input
                  type="url"
                  placeholder="https://exemplo.com/sua-imagem.jpg"
                  value={newPhoto.src}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="url-input"
                />
                <small>Cole aqui o link direto da imagem (JPG, PNG, GIF, WebP)</small>
              </div>

              <div className="form-section">
                <label> Título da Foto </label>
                <input
                  type="text"
                  placeholder="Ex: Apresentação do projeto na feira"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                  className="title-input"
                />
              </div>

              <div className="form-section">
                <label> Descrição *</label>
                <textarea
                  placeholder="Descreva o que está acontecendo na foto, o contexto, as pessoas envolvidas..."
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                  className="description-textarea"
                  rows={4}
                />
              </div>

              <div className="form-section">
                <label> Texto Alternativo (opcional)</label>
                <input
                  type="text"
                  placeholder="Descrição para acessibilidade (se vazio, usará o título)"
                  value={newPhoto.alt}
                  onChange={(e) => setNewPhoto({...newPhoto, alt: e.target.value})}
                  className="alt-input"
                />
                <small>Usado por leitores de tela para pessoas com deficiência visual</small>
              </div>
              
              {previewImage && (
                <div className="preview-section">
                  <label> Preview da Imagem:</label>
                  <div className="preview-container">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="preview-image"
                      onError={handleImageError}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="popup-actions">
              <button onClick={handleAddPhoto} className="add-btn">
                 Adicionar à Galeria
              </button>
              <button onClick={handleCancelAdd} className="cancel-btn">
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fotos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="foto-item">
            {isAuthenticated && (
              <button 
                onClick={() => handleDeletePhoto(photo.id)}
                className="delete-photo-btn"
                title="Remover foto"
              >
                X
              </button>
            )}
            
            <div className="foto-wrapper">
              <img 
                src={photo.src} 
                alt={photo.alt || photo.title}
                onError={handleImageError}
              />
            </div>
            
            <div className="foto-info">
              {photo.title && (
                <div className="foto-title">
                  {isAuthenticated ? (
                    <EditableText
                      id={`photo_title_${photo.id}`}
                      initialText={photo.title}
                      tag="h4"
                      className="photo-title-text"
                      placeholder="Clique para editar título..."
                    />
                  ) : (
                    <h4 className="photo-title-text">{photo.title}</h4>
                  )}
                </div>
              )}
              
              <div className="foto-description">
                {isAuthenticated ? (
                  <EditableText
                    id={`photo_desc_${photo.id}`}
                    initialText={photo.description}
                    className="photo-description-text"
                    multiline={true}
                    placeholder="Clique para adicionar descrição..."
                  />
                ) : (
                  <p className="photo-description-text">{photo.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="empty-gallery">
          <p>Nenhuma foto adicionada ainda.</p>
          {isAuthenticated && (
            <button onClick={() => setShowAddForm(true)} className="empty-add-btn">
              Adicionar primeira foto
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default EditableGallery;
