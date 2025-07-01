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
            <a href="/" className="nav-link">Sobre Nós</a>
            <a href="/carnauba" className="nav-link">Carnaúba</a>
            <a href="/arvores-nativas" className="nav-link">Árvores Nativas</a>
            <a href="/agentes" className="nav-link">Agentes</a>
            <a href="/quiz" className="nav-link">Quiz</a>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="main-content">
        {/* Layout principal com duas colunas */}
        <div className="content-layout">
          {/* Coluna da esquerda - Título e Imagem */}
          <div className="left-column">
            <h1 className="main-title">
              Onde e como<br />
              nasceu esse<br />
              projeto?
            </h1>
            <div className="carnauba-illustration">
              <img src="/Group-121.png" alt="Ilustração da Carnaúba" />
            </div>
          </div>
          
          {/* Coluna da direita - Texto */}
          <div className="text-column">
            <div className="text-content">
              <p>O Projeto PRODUTEC teve início no ano de 2023 na Escola de Ensino Médio Abraão Baquit, com o <strong>propósito de desenvolver uma pesquisa científica voltada para o estudo da carnaúba</strong> como recurso estratégico e alternativa sustentável de extrativismo para a região.</p>

              <h4 className="section-title">Ceará Científico</h4>
              <p>O Ceará Científico configura-se como a <strong>maior iniciativa estadual de fomento à pesquisa e ao compartilhamento de conhecimentos</strong>, sendo promovido anualmente pelo Governo do Ceará, por meio da Secretaria da Educação (Seduc), e estruturado em três etapas: escolar, regional e estadual. O evento <strong>tem como objetivos primordiais desenvolver o conhecimento científico dentro do âmbito das escolas públicas, estimular a cultura, a inclusão e a cooperação</strong>, bem como fomentar a investigação científica e cultural no ambiente educacional.</p>

              <p>Em seu primeiro ano de execução, o projeto <strong>obteve destaque ao conquistar a terceira colocação na fase regional</strong> da CREDE 12. No ano subsequente, alcançou um marco significativo ao sagrar-se <strong>vencedor da etapa regional</strong>, garantindo, assim, sua participação na fase estadual, realizada em Fortaleza.</p>
            </div>
          </div>
        </div>

        {/* Seção Vencedor */}
        <div className="vencedor-section">
          <h2 className="vencedor-texto">Vencedor da etapa <br/> regional em 2024!</h2>
        </div>

        {/* Seções adicionais */}
        <div className="additional-content">
          <h3 className="section-title">Próximos Passos</h3>
          <p>Em 2025, o projeto alinha-se à temática do Ceará Científico – <strong>"Educação Ambiental, Sustentabilidade e Emergência Climática"</strong> – com enfoque na produção e difusão de saberes científicos no contexto da crise climática global.</p>

          <h3 className="section-title-blue">Perspectivas para o Ceará Científico 2025</h3>
          <p>Nosso <strong>objetivo é analisar o potencial da carnaúba</strong> como uma alternativa sustentável em tempos de emergência climática, <strong>integrando saberes científicos e tradicionais</strong> para desenvolver <strong>soluções tecnológicas</strong> que promovam a <strong>preservação ambiental, a adaptação às mudanças climáticas</strong> e o <strong>fortalecimento das comunidades locais</strong>.</p>
        </div>
      </main>

      {/* Galeria de fotos */}
      <section className="galeria-section">
        <h3>Nossa jornada em fotos</h3>
        <div className="fotos-container">
          <div className="foto-item">
            <img src="/foto1.jpg" alt="Apresentação do projeto" />
            <p>Produção de caderno de campo, elemento de suma importância para a avaliação do projeto</p>
          </div>
          <div className="foto-item">
            <img src="/imagens/foto2.jpg" alt="Equipe com a bandeira" />
            <p>Produção de caderno de campo, elemento de suma importância para a avaliação do projeto</p>
          </div>
          <div className="foto-item">
            <img src="/foto3.jpg" alt="Alunos com o caderno" />
            <p>Produção de caderno de campo, elemento de suma importância para a avaliação do projeto</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <nav>
          <ul>
            <li><a href="/">Sobre Nós</a></li>
            <li><a href="/carnauba">Carnaúba</a></li>
            <li><a href="/arvores-nativas">Árvores Nativas</a></li>
            <li><a href="/agentes">Agentes</a></li>
            <li><a href="/quiz">Quiz</a></li>
          </ul>
        </nav>
        <div className="redes-sociais">
          <a href="#">Youtube</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
