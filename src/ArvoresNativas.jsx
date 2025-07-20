import React from 'react';
import { useAuth } from './ADM/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import EditableText from './components/EditableText';
import AddTreeForm from './components/AddTreeForm';
import contentManager from './utils/contentManager';
import arvoresService from './services/arvoresService';
import './ArvoresNativas.css';

// Importações de imagens
import aroeira from './assets/aroeira.jpg';
import AngicoVermelho from './assets/AngicoVermelho.jpg';
import IpeRoxo from './assets/IpeRoxo.png';

export default function ArvoresNativas() {
  console.log('ArvoresNativas componente carregado');
  console.log('arvoresService:', arvoresService);
  
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isAddTreeFormOpen, setIsAddTreeFormOpen] = React.useState(false);
  const [customTrees, setCustomTrees] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { isAuthenticated, logout } = useAuth();

  // Carregar árvores do Firebase
  React.useEffect(() => {
    loadArvores();
  }, []);

  const loadArvores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Tentar carregar do Firebase
      const arvores = await arvoresService.getAllArvores();
      
      // Se não houver árvores no Firebase, tentar migrar do localStorage
      if (arvores.length === 0) {
        console.log('Nenhuma árvore no Firebase, tentando migrar do localStorage...');
        const migratedArvores = await arvoresService.migrateFromLocalStorage();
        setCustomTrees(migratedArvores);
      } else {
        setCustomTrees(arvores);
      }
    } catch (err) {
      console.error('Erro ao carregar árvores:', err);
      setError('Erro ao carregar árvores. Usando dados locais como fallback.');
      
      // Fallback para localStorage em caso de erro
      const localTrees = contentManager.loadTrees();
      setCustomTrees(localTrees);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => setIsLoginPopupOpen(true);
  const handleLogoutClick = () => logout();
  const handleClosePopup = () => setIsLoginPopupOpen(false);

  const handleAddTree = async (newTreeData) => {
    console.log('handleAddTree chamado com:', newTreeData);
    try {
      setError(null);
      
      // Validar dados
      console.log('Validando dados...');
      const validation = arvoresService.validateArvoreData(newTreeData);
      console.log('Resultado da validação:', validation);
      
      if (!validation.isValid) {
        alert('Dados inválidos:\n' + validation.errors.join('\n'));
        return;
      }

      // Adicionar no Firebase
      console.log('Tentando adicionar no Firebase...');
      const newTree = await arvoresService.addArvore({
        name: newTreeData.name,
        description: newTreeData.description,
        imageUrl: newTreeData.imageUrl
      });
      console.log('Árvore adicionada no Firebase:', newTree);

      // Atualizar estado local
      setCustomTrees(prevTrees => [newTree, ...prevTrees]);
      
      // Backup no localStorage
      await arvoresService.backupToLocalStorage();
      
      console.log('Árvore adicionada com sucesso:', newTree);
      alert('Árvore adicionada com sucesso!');
    } catch (err) {
      console.error('Erro ao adicionar árvore:', err);
      setError('Erro ao salvar árvore. Tente novamente.');
      alert('Erro ao salvar árvore: ' + err.message);
      
      // Fallback para localStorage
      const treeWithId = { ...newTreeData, id: Date.now() };
      const updatedTrees = [treeWithId, ...customTrees];
      setCustomTrees(updatedTrees);
      contentManager.saveTrees(updatedTrees);
      contentManager.markUpdate();
    }
  };

  const handleDeleteTree = async (treeId) => {
    if (!window.confirm('Tem certeza que deseja remover esta árvore?')) {
      return;
    }

    try {
      setError(null);
      
      // Remover do Firebase
      await arvoresService.deleteArvore(treeId);
      
      // Atualizar estado local
      setCustomTrees(prevTrees => prevTrees.filter(tree => tree.id !== treeId));
      
      // Backup no localStorage
      await arvoresService.backupToLocalStorage();
      
      console.log('Árvore removida com sucesso');
    } catch (err) {
      console.error('Erro ao remover árvore:', err);
      setError('Erro ao remover árvore. Tente novamente.');
      
      // Fallback para localStorage
      const updatedTrees = customTrees.filter(tree => tree.id !== treeId);
      setCustomTrees(updatedTrees);
      contentManager.saveTrees(updatedTrees);
      contentManager.markUpdate();
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NiA4NEMzNi44NjI5IDg0IDEzLjUgMTA3LjM2MyAxMy41IDEzNi41UzM2Ljg2MjkgMTg5IDY2IDE4OSA4My44NjI5IDE2NS42MzcgODMuODYyOSAxMzYuNVM2MC42MzcxIDg0IDY2IDg0WiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNMTE2IDEwMkMxMDIuNzQ1IDEwMiA5MiAxMTIuNzQ1IDkyIDEyNlM3Mi4yNTUgMTUwIDg2IDE1MFMxMDAgMTM5LjI1NSAxMDAgMTI2IDEwOS4yNTUgMTAyIDExNiAxMDJaIiBmaWxsPSIjRDlEOUQ5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjU2NTY1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbSBuJiM5NzE7byBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K';
    e.target.alt = 'Imagem não encontrada';
  };

  return (
    <div className="arvores-page">
      <Header />

      {/* Conteúdo Principal */}
      <main className="main-content">
        {/* Seção de Introdução */}
        <section className="intro-section">
          <EditableText
            id="arvores_intro_title"
            initialText="E as outras árvores nativas?"
            tag="h3"
            className="section-title"
          />
          <EditableText
            id="arvores_intro_text"
            initialText="Falando mais sobre as árvores nativas da caatinga, que além de embelezarem nosso nordeste, são essenciais para nosso ecossistema, trazemos aqui alguns dados sobre elas."
            tag="p"
            className="section-text"
          />
        </section>

        {/* Seção sobre a Caatinga */}
        <section className="caatinga-section">
          <div className="text-column">
            <EditableText
              id="caatinga_title"
              initialText="Belezas da mata branca cearense"
              tag="h4"
              className="section-subtitle"
            />
            <EditableText
              id="caatinga_text"
              initialText="A Caatinga é um bioma único no mundo, encontrado somente no nordeste do Brasil e em partes do norte de Minas Gerais. Seu nome vem do tupi-guarani: 'caa' (mata) + 'tinga' (branca), significando <strong>mata branca</strong>, uma referência à
                paisagem esbranquiçada que predomina na estação seca, quando
                muitas plantas perdem suas folhas para conservar água. Com um
                clima categoriza como semiárido, plantas xerófilas (resistente à
                seca), como cactos, árvores de troncos retorcidos e uma
                biodiversidade exclusiv, já que muitas
                espécies só existem no nosso bioma, como o tatu-bola,
                a ararinha-azul (extinta na natureza) e a cobra-cascavel, a
                caatinga se torna foco de preservação ambiental ."
              tag="p"
              className="section-text"
              multiline={true}
            />
          </div>
        </section>

        {/* Galeria de Árvores */}
        <section className="trees-gallery">
          <div className='arvores-nativas'>
            <EditableText
              id="arvores_nativas_title"
              initialText="De uma olhadinha nessas belezas"
              tag="h2"
              className="arvores-title"
            />
            {isAuthenticated && (
              <button 
                onClick={() => setIsAddTreeFormOpen(true)} 
                className="add-tree-btn"
                title="Adicionar nova árvore nativa"
              >
                🌳 Adicionar Árvore
              </button>
            )}
          </div>
          <div className="trees-container">
            {/* Ipê Roxo */}
            <div className="tree-card">
              <div className="tree-image">
                <img src={IpeRoxo} alt="Ipê Roxo" />
              </div>
              <div className="tree-info">
                <EditableText
                  id="ipe_title"
                  initialText="Ipê Roxo"
                  tag="h3"
                  className="tree-name"
                />
                <EditableText
                  id="ipe_description"
                  initialText=" O ipê-roxo possui tronco reto ou levemente tortuoso, com casca grossa e fissurada de coloração marrom-acinzentada, podendo atingir até 30 metros de altura. Suas folhas são compostas e digitada, verde-escuras e caducas, caindo no inverno. Entre maio e agosto, a árvore se enche de belas flores roxas ou rosas, dispostas em cachos, criando um espetáculo visual quando a árvore está quase sem folhas. Os frutos são cápsulas longas (vagens) que liberam sementes aladas quando maduras. Sua madeira é extremamente dura, densa e durável, muito valorizada na construção civil e marcenaria. "
                  tag="p"
                  className="tree-description"
                  multiline={true}
                />
              </div>
            </div>

            {/* Aroeira */}
            <div className="tree-card">
              <div className="tree-image">
                <img src={aroeira} alt="Aroeira" />
              </div>
              <div className="tree-info">
                <EditableText
                  id="aroeira_title"
                  initialText="Aroeira"
                  tag="h3"
                  className="tree-name"
                />
                <EditableText
                  id="aroeira_description"
                  initialText=" A aroeira apresenta porte mediano chegando a atingir 10m de altura e 30cm de diâmetro, fuste linheiro, madeira dura de cor bege-roseada quando verde, e roxo escuro quando seco. A casca é castanha escura, subdividida em placas escamiformes. As folhas, quando maduras, servem como forrageiras, e a resina exsudada dos troncos é utilizada no preparo da goma arábica. A madeira serve para obras externas, mourões, vigas, construções rurais, estacas, dormentes e carvão de elevado poder calorífico."
                  tag="p"
                  className="tree-description"
                  multiline={true}
                />
              </div>
            </div>

            {/* Angico Vermelho */}
            <div className="tree-card">
              <div className="tree-image">
                <img src={AngicoVermelho} alt="Angico Vermelho" />
              </div>
              <div className="tree-info">
                <EditableText
                  id="angico_title"
                  initialText="Angico Vermelho"
                  tag="h3"
                  className="tree-name"
                />
                <EditableText
                  id="angico_description"
                  initialText=" O Angico-Vermelho apresenta um tronco cilíndrico ou tortuoso com 40-60 cm de diâmetro, cuja casca varia de quase lisa e clara a rugosa ou muito fissurada e escura. Suas folhas são compostas bipinadas  e possuem coloração verde-escuro. As flores são pequenas, amarelas com manchas brancas, florescendo entre setembro e novembro, período em que a planta está com poucas folhas. Os frutos são vagens (12-15 cm de comprimento) com 5-10 sementes, de superfície áspera e cor marrom, amadurecendo de agosto a novembro. A madeira é muito pesada, densa, não elástica e de grande durabilidade."
                  tag="p"
                  className="tree-description"
                  multiline={true}
                />
              </div>
            </div>

            {/* Pereiro */}
            <div className="tree-card">
              <div className="tree-image">
                <img src="https://www.loja.sementescaicara.com/arquivos/PRODUTOS/118163611638489542/1343_G_Pereiro_97.jpg" alt="Pereiro" />
              </div>
              <div className="tree-info">
                <EditableText
                  id="pereiro_title"
                  initialText="Pereiro"
                  tag="h3"
                  className="tree-name"
                />
                <EditableText
                  id="pereiro_description"
                  initialText="O Pereiro é uma árvore típica da Caatinga, de porte médio, com tronco tortuoso e casca espessa. Suas folhas são pequenas e caducas, e a madeira é muito valorizada pela resistência e durabilidade, sendo utilizada em construções rurais e na produção de carvão."
                  tag="p"
                  className="tree-description"
                  multiline={true}
                />
              </div>
            </div>

            {/* Catingueira */}
            <div className="tree-card">
              <div className="tree-image">
                <img src="https://cdn.sistemawbuy.com.br/arquivos/c3a25fa80902b3923a744000d752e6ac/produtos/642c615215799/planta-64395e7fd082d.jpg" alt="Pereiro" />
              </div>
              <div className="tree-info">
                <EditableText
                  id="catingueira_title"
                  initialText="Catingueira"
                  tag="h3"
                  className="tree-name"
                />
                <EditableText
                  id="catingueira_description"
                  initialText="É uma árvore com madeira de média qualidade utilizada em cercas como estacas, lenha para diversos usos pela população local, e utilizada na medicina popular; flores amarelas dispostas em cachos nos ramos e galhos mais finos, perfumadas atraem grande número de insetos, os frutos são pequenas vargens marrons que amadurecem no período da estiagem. Árvore de grande beleza que pode se utilizada na arborização urbana como praças e bosques, e como planta pioneira de rápido crescimento, seria aproveitável seu uso na recuperação de áreas degradadas pelo desmatamento."
                  tag="p"
                  className="tree-description"
                  multiline={true}
                />
              </div>
            </div>

            {/* Barriguda */}
            <div className="tree-card">
              <div className="tree-image">
                <img src="https://i.pinimg.com/736x/3e/93/87/3e93872919b86ae49bcbb14c6055b534.jpg" alt="Barriguda" />
              </div>
              <div className="tree-info">
                <EditableText
                  id="barriguda_title"
                  initialText="Barriguda"
                  tag="h3"
                  className="tree-name"
                />
                <EditableText
                  id="barriguda_description"
                  initialText="A barriguda é uma árvore emblemática da Caatinga, conhecida por seu tronco inchado na base (que armazena água para sobreviver à seca) e sua casca esverdeada com espinhos. Pode atingir até 15 metros de altura, possui folhas grandes e flores brancas ou rosadas que atraem polinizadores como morcegos. Seus frutos liberam fibras macias (paininha), usadas tradicionalmente no artesanato local. Essa espécie, resistente ao clima semiárido, é um símbolo de adaptação do bioma, fornecendo sombra, alimento para a fauna e recursos para as comunidades sertanejas."
                  tag="p"
                  className="tree-description"
                  multiline={true}
                />
              </div>
            </div>

            {/* Árvores customizadas */}
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="loading-message">
                🌱 Carregando árvores...
              </div>
            ) : (
              customTrees.map((tree) => (
                <div key={tree.id} className="tree-card">
                  {isAuthenticated && (
                    <button 
                      onClick={() => handleDeleteTree(tree.id)}
                      className="delete-tree-btn"
                      title="Remover árvore"
                    >
                      ✕
                    </button>
                  )}
                  
                  <div className="tree-image">
                    <img 
                      src={tree.imageUrl} 
                      alt={tree.name}
                      onError={handleImageError}
                    />
                  </div>
                  
                  <div className="tree-info">
                    <h3 className="tree-name">{tree.name}</h3>
                    
                    <div className="tree-description">
                      <p>{tree.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer onLoginClick={handleLoginClick} />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleClosePopup}
      />

      <AddTreeForm
        isOpen={isAddTreeFormOpen}
        onClose={() => setIsAddTreeFormOpen(false)}
        onAddTree={handleAddTree}
      />
    </div>
  );
}