import React, { useState } from 'react';
import { AgentesService } from '../services/agentesService';
import './CadastroAgente.css';

const CadastroAgente = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    escola: '',
    anoEstudo: '',
    motivacao: '',
    termosAceitos: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const steps = [
    { id: 'dados-iniciais', title: 'Dados iniciais', completed: false },
    { id: 'escola', title: 'Escola', completed: false },
    { id: 'motivacao', title: 'Motivação', completed: false },
    { id: 'termo-aceite', title: 'Termo de aceite', completed: false }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    // Mostrar modal de confirmação apenas nas etapas 0 (Dados iniciais) e 1 (Escola)
    if (currentStep === 0 || currentStep === 1) {
      setShowConfirmModal(true);
    } else {
      // Para outras etapas, avançar diretamente
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleConfirmNext = () => {
    setShowConfirmModal(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCancelNext = () => {
    setShowConfirmModal(false);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    if (!formData.termosAceitos) {
      setError('Você deve aceitar os termos para continuar.');
      setLoading(false);
      return;
    }

    try {
      const resultado = await AgentesService.cadastrarAgente(formData);
      
      if (resultado.success) {
        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          escola: '',
          anoEstudo: '',
          motivacao: '',
          termosAceitos: false
        });
        
        // Notificar sucesso
        if (onSuccess) {
          onSuccess(resultado.agente);
        }
        
        // Ir para página de sucesso
        setCurrentStep(4);
        
      } else {
        setError(resultado.message || 'Erro ao cadastrar agente.');
      }
    } catch (err) {
      setError('Erro interno. Tente novamente.');
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setCurrentStep(0);
    }
  };

  const handleHomeReturn = () => {
    onClose();
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className="cadastro-overlay" onClick={handleClose}>
      <div className="cadastro-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cadastro-header">
          <div className="logo">
            <div className="logo-text">Projeto</div>
            <div className="logo-subtext">PRODUTEC</div>
          </div>
          <button className="home-button" onClick={handleHomeReturn}>
             Voltar
          </button>
        </div>

        <div className="cadastro-content">
          {/* Sidebar com steps */}
          <div className="sidebar">
            <div className="steps-container">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-circle">
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <div className="step-title">{step.title}</div>
                  {index < steps.length - 1 && <div className="step-line"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            
            {/* Step 1: Dados pessoais */}
            {currentStep === 0 && (
              <div className="step-content">
                <h2>Dados pessoais</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                  <div className="form-group">
                    <label htmlFor="nome">Nome e sobrenome *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="👤 Nome"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="✉️ Exemplo@gmail.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefone">Número de celular *</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      placeholder="📱 (DD) X XXXX-XXXX"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="continue-button">
                      Continuar →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Escola */}
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Escola</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                  <div className="form-group">
                    <label htmlFor="escola">Encontre aqui qual das escola você estuda</label>
                    <div className="search-container">
                      <input
                        type="text"
                        id="escola"
                        name="escola"
                        value={formData.escola}
                        onChange={handleInputChange}
                        placeholder="🔍 Busque aqui"
                      />
                      <button type="button" className="dropdown-button">▼</button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="anoEstudo">Em que ano você está estudando? *</label>
                    <input
                      type="text"
                      id="anoEstudo"
                      name="anoEstudo"
                      value={formData.anoEstudo}
                      onChange={handleInputChange}
                      placeholder="Ex: 3º ano"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handleBack} className="back-button">
                      ← Voltar
                    </button>
                    <button type="submit" className="continue-button">
                      Continuar →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Motivação */}
            {currentStep === 2 && (
              <div className="step-content">
                <h2>Motivação</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                  <div className="form-group">
                    <label htmlFor="motivacao">
                      Aqui você fala um pouco do por que você gostaria de participar do projeto:
                    </label>
                    <textarea
                      id="motivacao"
                      name="motivacao"
                      value={formData.motivacao}
                      onChange={handleInputChange}
                      placeholder="Escreva aqui"
                      rows="6"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handleBack} className="back-button">
                      ← Voltar
                    </button>
                    <button type="submit" className="continue-button">
                      Continuar →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Termo de aceite */}
            {currentStep === 3 && (
              <div className="step-content">
                <h2>Termo</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="terms-content">
                    <p>
                      Ao se cadastrar como Agente ProduTec, você estará participando de forma 
                      totalmente gratuita no projeto. Isso significa que não há um vínculo empregatício 
                      nem remuneração, e você pode interromper sua participação a qualquer 
                      momento, sem justificativas ou penalidades.
                    </p>
                    <p>
                      As informações fornecidas serão usadas exclusivamente para fins organizacionais 
                      e de comunicação interna do projeto, respeitando a sua privacidade.
                    </p>
                  </div>

                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="termosAceitos"
                        checked={formData.termosAceitos}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="checkmark"></span>
                      Aceito os termos
                    </label>
                  </div>

                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}

                  <div className="form-actions">
                    <button type="button" onClick={handleBack} className="back-button">
                      ← Voltar
                    </button>
                    <button type="submit" disabled={loading || !formData.termosAceitos} className="submit-button">
                      {loading ? 'Enviando...' : 'Enviar cadastro'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 5: Sucesso */}
            {currentStep === 4 && (
              <div className="step-content success-content">
                <div className="success-icon">✓</div>
                <h2>Cadastro feito!</h2>
                <p>Iremos checar seus dados e entraremos em contato.</p>
                <p>Obrigado por se cadastrar!</p>
                
                <button onClick={handleHomeReturn} className="home-return-button">
                   Voltar
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
      
      {/* Modal de confirmação */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay" onClick={handleCancelNext}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-content">
              <h3>⚠️ Confirmação</h3>
              <p>
                Confira atentamente suas informações antes de continuar. 
                Após essa etapa, não será possível fazer alterações.
              </p>
              <div className="confirm-modal-actions">
                <button onClick={handleCancelNext} className="cancel-confirm-button">
                  Revisar informações
                </button>
                <button onClick={handleConfirmNext} className="continue-confirm-button">
                  Continuar mesmo assim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroAgente;
