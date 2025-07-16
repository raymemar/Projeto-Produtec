import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './ADM/AuthContext';
import './HomePage.css';
import LoginPopup from './components/LoginPopup';
import EditableText from './components/EditableText';
import EditableGallery from './components/EditableGallery';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <div className="home-page">
      <Header />
      
      {/* Conteúdo principal */}
      <main className="main-content">
        {/* Layout principal com duas colunas */}
        <div className="content-layout">
          {/* Coluna da esquerda - Título e Imagem */}
          <div className="left-column">
            <EditableText
              id="main_title"
              initialText="Onde e como<br />nasceu esse<br />projeto?"
              tag="h1"
              className="main-title"
              multiline={true}
            />
            <div className="carnauba-illustration">
              <img src="/Carnauba.png" alt="Ilustração da Carnaúba" />
            </div>
          </div>
          
          {/* Coluna da direita - Texto */}
          <div className="text-column">
            <div className="text-content">
              <EditableText
                id="intro_paragraph"
                initialText="O Projeto PRODUTEC teve início no ano de 2023 na Escola de Ensino Médio Abraão Baquit, com o <strong>propósito de desenvolver uma pesquisa científica voltada para o estudo da carnaúba</strong> como recurso estratégico e alternativa sustentável de extrativismo para a região."
                tag="p"
                multiline={true}
              />
              
              <EditableText
                id="ceara_cientifico_title"
                initialText="Ceará Científico"
                tag="h4"
                className="section-title"
              />
              
              <EditableText
                id="ceara_cientifico_desc"
                initialText="O Ceará Científico configura-se como a <strong>maior iniciativa estadual de fomento à pesquisa e ao compartilhamento de conhecimentos</strong>, sendo promovido anualmente pelo Governo do Ceará, por meio da Secretaria da Educação (Seduc), e estruturado em três etapas: escolar, regional e estadual. O evento <strong>tem como objetivos primordiais desenvolver o conhecimento científico dentro do âmbito das escolas públicas, estimular a cultura, a inclusão e a cooperação</strong>, bem como fomentar a investigação científica e cultural no ambiente educacional."
                tag="p"
                multiline={true}
              />
              
              <EditableText
                id="conquistas_paragraph"
                initialText="Em seu primeiro ano de execução, o projeto <strong>obteve destaque ao conquistar a terceira colocação na fase regional</strong> da CREDE 12. No ano subsequente, alcançou um marco significativo ao sagrar-se <strong>vencedor da etapa regional</strong>, garantindo, assim, sua participação na fase estadual, realizada em Fortaleza."
                tag="p"
                multiline={true}
              />
            </div>
          </div>
        </div>

        {/* Seção Vencedor */}
        <div className="vencedor-section">
          <EditableText
            id="vencedor_text"
            initialText="Vencedor da etapa <br/> regional em 2024!"
            tag="h2"
            className="vencedor-texto"
            multiline={true}
          />
        </div>

        {/* Seções adicionais */}
        <div className="additional-content">
          <EditableText
            id="proximos_passos_title"
            initialText="Próximos Passos"
            tag="h4"
            className="section-title"
          />
          
          <EditableText
            id="proximos_passos_desc"
            initialText="Em 2025, o projeto alinha-se à temática do Ceará Científico – <strong>&quot;Educação Ambiental, Sustentabilidade e Emergência Climática&quot;</strong> – com enfoque na produção e difusão de saberes científicos no contexto da crise climática global."
            tag="p"
            multiline={true}
          />

          <EditableText
            id="perspectivas_title"
            initialText="Perspectivas para o Ceará Científico 2025"
            tag="h3"
            className="section-title-blue"
          />
          
          <EditableText
            id="perspectivas_desc"
            initialText="Nosso <strong>objetivo é analisar o potencial da carnaúba</strong> como uma alternativa sustentável em tempos de emergência climática, <strong>integrando saberes científicos e tradicionais</strong> para desenvolver <strong>soluções tecnológicas</strong> que promovam a <strong>preservação ambiental, a adaptação às mudanças climáticas</strong> e o <strong>fortalecimento das comunidades locais</strong>."
            tag="p"
            multiline={true}
          />
        </div>
      </main>

      {/* Seção de Galeria de Fotos */}
      <section className="gallery-section">
        {/* Galeria de fotos editável */}
        <EditableGallery />
      </section>

      <Footer onLoginClick={handleLoginClick} />

      {/* Popup de Login */}
      <LoginPopup 
        isOpen={isLoginPopupOpen} 
        onClose={handleClosePopup} 
      />
    </div>
  );
}
