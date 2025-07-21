import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CadastroAgentePage.css';

function CadastroAgentePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: '',
    email: '',
    telefone: '',
    // Escola
    escola: '',
    serie: '',
    // Motivação
    motivacao: '',
    // Termos
    aceitaTermos: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const steps = [
    { id: 1, title: 'Dados Iniciais' },
    { id: 2, title: 'Escola' },
    { id: 3, title: 'Motivação' },
    { id: 4, title: 'Termo de aceite' }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
        if (!formData.email.trim()) {
          newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email inválido';
        }
        if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
        break;
      case 2:
        if (!formData.escola.trim()) newErrors.escola = 'Escola é obrigatória';
        if (!formData.serie.trim()) newErrors.serie = 'Série/Ano é obrigatório';
        break;
      case 3:
        if (!formData.motivacao.trim()) newErrors.motivacao = 'Motivação é obrigatória';
        break;
      case 4:
        if (!formData.aceitaTermos) newErrors.aceitaTermos = 'Você deve aceitar os termos';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 || currentStep === 2) {
        setShowConfirmModal(true);
      } else {
        setCurrentStep(prev => Math.min(prev + 1, steps.length));
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      setShowConfirmModal(true);
    }
  };

  const confirmSubmit = () => {
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    console.log('Dados do formulário:', formData);
    // Simular envio
    setIsSubmitted(true);
    setShowConfirmModal(false);
  };

  const confirmNextStep = () => {
    setShowConfirmModal(false);
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const cancelConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Dados pessoais</h2>
            
            <div className="form-group">
              <label htmlFor="nome">Nome e sobrenome *</label>
              <input
                type="text"
                id="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className={errors.nome ? 'error' : ''}
              />
              {errors.nome && <div className="error-message">{errors.nome}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                placeholder="Exemplo@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Número de celular *</label>
              <input
                type="tel"
                id="telefone"
                placeholder="(DD) X XXXX-XXXX"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                className={errors.telefone ? 'error' : ''}
              />
              {errors.telefone && <div className="error-message">{errors.telefone}</div>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>Escola</h2>
            <div className="form-group">
              <label htmlFor="escola">Nome da escola *</label>
              <div className="search-container">
                <input
                  type="text"
                  id="escola"
                  placeholder="Digite o nome da sua escola"
                  value={formData.escola}
                  onChange={(e) => handleInputChange('escola', e.target.value)}
                  className={errors.escola ? 'error' : ''}
                />
              </div>
              {errors.escola && <div className="error-message">{errors.escola}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="serie">Série/Ano que está estudando *</label>
              <input
                type="text"
                id="serie"
                placeholder="Ex: 3º ano, 2ª série, etc."
                value={formData.serie}
                onChange={(e) => handleInputChange('serie', e.target.value)}
                className={errors.serie ? 'error' : ''}
              />
              {errors.serie && <div className="error-message">{errors.serie}</div>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>Motivação</h2>
            
            <div className="form-group">
              <label htmlFor="motivacao">Por que você quer ser um agente da Caatinga? *</label>
              <textarea
                id="motivacao"
                placeholder="Conte-nos sua motivação..."
                value={formData.motivacao}
                onChange={(e) => handleInputChange('motivacao', e.target.value)}
                className={errors.motivacao ? 'error' : ''}
                rows="6"
              />
              {errors.motivacao && <div className="error-message">{errors.motivacao}</div>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Termo de aceite</h2>
            
            <div className="terms-content">
              <p>Ao se cadastrar como Agente da Caatinga, você concorda em:</p>
              <p>• Promover a conservação e preservação do bioma Caatinga</p>
              <p>• Compartilhar conhecimentos sobre sustentabilidade ambiental</p>
              <p>• Participar de atividades educativas e de conscientização</p>
              <p>• Respeitar as diretrizes do programa</p>
              <p>• Manter suas informações atualizadas</p>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.aceitaTermos}
                  onChange={(e) => handleInputChange('aceitaTermos', e.target.checked)}
                />
                <span className="checkmark">Eu aceito os termos e condições</span>
              </label>
              {errors.aceitaTermos && <div className="error-message">{errors.aceitaTermos}</div>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="cadastro-page">
        <header className="cadastro-header">
          <div className="logo">
            <h1 className="logo-text">Projeto</h1>
            <h2 className="logo-subtext">PRODUTEC</h2>
          </div>
          <Link to="/" className="home-button">
            Voltar
          </Link>
        </header>
        <div className="cadastro-content">
          <div className="main-content">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h2>Cadastro realizado com sucesso!</h2>
              <p>Parabéns! Agora você é oficialmente um Agente da Caatinga.</p>
              <p>Em breve entraremos em contato com mais informações.</p>
              <Link to="/" className="home-return-button">
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal de confirmação para etapas 1 e 2
  const showStepConfirmModal = showConfirmModal && (currentStep === 1 || currentStep === 2);

  return (
    <div className="cadastro-page">
      <header className="cadastro-header">
        <div className="logo">
          <h1 className="logo-text">Projeto</h1>
          <h2 className="logo-subtext">PRODUTEC</h2>
        </div>
        <Link to="/agentes" className="home-button">
          Voltar
        </Link>
      </header>

      <div className="cadastro-content">
        <div className="sidebar">
          <div className="steps-container">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              >
                <div className="step-circle">
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <div className="step-title">{step.title}</div>
                {idx < steps.length - 1 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          {renderStepContent()}
          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="back-button" onClick={prevStep}>
                Voltar
              </button>
            )}
            {currentStep < steps.length && (
              <button type="button" className="continue-button" onClick={nextStep}>
                Continuar
              </button>
            )}
            {currentStep === steps.length && (
              <button type="button" className="submit-button" onClick={handleSubmit}>
                Enviar cadastro
              </button>
            )}
          </div>
        </div>
      </div>

      {showStepConfirmModal && (
        <div className="confirm-modal-overlay" onClick={cancelConfirmModal}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="confirm-modal-content">
              <h3>Confirmação</h3>
              <p>Confira atentamente suas informações antes de continuar. Após essa etapa, não será possível fazer alterações.</p>
              <div className="confirm-modal-actions">
                <button onClick={cancelConfirmModal} className="cancel-confirm-button">
                  Revisar informações
                </button>
                <button onClick={confirmNextStep} className="continue-confirm-button">
                  Continuar mesmo assim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroAgentePage;
