import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      
      {/* Header com navegação */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>Projeto</h1>
            <h2>PRODUTEC</h2>
          </div>
          <nav className="nav-menu">
            <a href="/" className="nav-link">Home</a>
            <a href="/carnauba" className="nav-link">Carnaúba</a>
            <a href="/arvores-nativas" className="nav-link">Árvores Nativas</a>
            <a href="/agentes" className="nav-link">Agentes</a>
            <a href="/quiz" className="nav-link">Quiz</a>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="main-content">
        <div className="content-wrapper">
          <div className="text-content">
            <section className="intro-section">
              <h2>Onde e como nasceu esse projeto?</h2>
              <p>O Projeto PRODUTEC teve início no ano de 2023 na Escola de Ensino Médio Abraão Baquit, com o <strong>propósito de desenvolver uma pesquisa científica voltada para o estudo da carnaúba</strong> como recurso estratégico e alternativa sustentável de extrativismo para a região.</p>
            </section>

            <section className="ceara-cientifico-section">
              <h3>Ceará Científico</h3>
              <p>O Ceará Científico configura-se como a <strong>maior iniciativa estadual de fomento à pesquisa e ao compartilhamento de conhecimentos</strong>, sendo promovido anualmente pelo Governo do Ceará, por meio da Secretaria da Educação (Seduc), e estruturado em três etapas: escolar, regional e estadual. O evento tem como objetivos primordiais <strong>fortalecer a articulação dos saberes científicos nas escolas públicas, estimular a cultura, a inclusão e a cooperação</strong>, bem como fomentar a investigação científica e cultural no ambiente educacional.</p>
            </section>

            <section className="conquistas-section">
              <p>Em seu primeiro ano de execução, o projeto <strong>obteve destaque ao conquistar a terceira colocação na fase regional</strong> da CREDE 12. No ano seguinte, alcançou um marco significativo ao sagrar-se <strong>vencedor da etapa regional</strong>, garantindo assim sua participação na fase estadual, realizada em Fortaleza.</p>
              <h4 className="vencedor-texto">Vencedor da etapa regional em 2024!</h4>
            </section>

            <section className="proximos-passos-section">
              <h3>Próximos Passos</h3>
              <p>Em 2025, o projeto alinha-se à temática do Ceará Científico – <strong>"Educação Ambiental, Sustentabilidade e Emergência Climática"</strong> – com enfoque na produção e difusão de saberes científicos no contexto da crise climática global.</p>
            </section>

            <section className="perspectivas-section">
              <h3>Perspectivas para o Ceará Científico 2025</h3>
              <p>Nosso <strong>objetivo é analisar o potencial da carnaúba</strong> como uma alternativa sustentável em tempos de emergência climática, <strong>integrando saberes científicos e tradicionais</strong> para desenvolver soluções tecnológicas que promovam a <strong>preservação ambiental, a adaptação às mudanças climáticas</strong> e o <strong>fortalecimento das comunidades locais</strong>.</p>
            </section>
          </div>

          <div className="image-content">
            <div className="carnauba-illustration">
              <img src="/Group-121.png" alt="Ilustração da palmeira carnaúba" />
            </div>
          </div>
        </div>
      </main>

      <section className="galeria-section">
        <h3>Nossa jornada em fotos</h3>
        <div className="fotos-container">
          <div className="foto-item">
            <img src="/imagens/foto1.jpg" alt="Apresentação do projeto" />
            <p>Produção de caderno de campo, elemento de suma importância para a avaliação do projeto</p>
          </div>
          <div className="foto-item">
            <img src="/imagens/foto2.jpg" alt="Equipe com a bandeira" />
            <p>Produção de caderno de campo, elemento de suma importância para a avaliação do projeto</p>
          </div>
          <div className="foto-item">
            <img src="/imagens/foto3.jpg" alt="Alunos com o caderno" />
            <p>Produção de caderno de campo, elemento de suma importância para a avaliação do projeto</p>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/carnauba">Carnaúba</a></li>
            <li><a href="/arvores-nativas">Árvores Nativas</a></li>
            <li><a href="/agentes">Agentes</a></li>
            <li><a href="/quiz">Quiz</a></li>
          </ul>
        </nav>
        <div className="redes-sociais">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>

    </div>
  );
}
