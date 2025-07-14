// Sistema de gerenciamento de dados fake (usando localStorage)
class ContentManager {
  constructor() {
    this.prefix = 'produtec_content_';
    this.galleryKey = 'produtec_gallery';
  }

  // Salvar texto editável
  saveText(id, content) {
    try {
      localStorage.setItem(`${this.prefix}${id}`, content);
      return true;
    } catch (error) {
      console.error('Erro ao salvar texto:', error);
      return false;
    }
  }

  // Carregar texto editável
  loadText(id, defaultContent = '') {
    try {
      const saved = localStorage.getItem(`${this.prefix}${id}`);
      return saved !== null ? saved : defaultContent;
    } catch (error) {
      console.error('Erro ao carregar texto:', error);
      return defaultContent;
    }
  }

  // Salvar galeria de fotos
  saveGallery(photos) {
    try {
      localStorage.setItem(this.galleryKey, JSON.stringify(photos));
      return true;
    } catch (error) {
      console.error('Erro ao salvar galeria:', error);
      return false;
    }
  }

  // Carregar galeria de fotos
  loadGallery() {
    try {
      const saved = localStorage.getItem(this.galleryKey);
      if (saved) {
        return JSON.parse(saved);
      }
      // Retornar galeria padrão se não houver dados salvos
      return this.getDefaultGallery();
    } catch (error) {
      console.error('Erro ao carregar galeria:', error);
      return this.getDefaultGallery();
    }
  }

  // Galeria padrão
  getDefaultGallery() {
    return [
      {
        id: 1,
        src: '/foto1.jpg',
        alt: 'Apresentação do projeto',
        title: 'Apresentação do Projeto PRODUTEC',
        description: 'Produção de caderno de campo, elemento de suma importância para a avaliação do projeto'
      },
      {
        id: 2,
        src: '/foto2.png',
        alt: 'Equipe com a bandeira',
        title: 'Equipe PRODUTEC na Feira',
        description: 'Equipe do projeto PRODUTEC apresentando os resultados da pesquisa sobre carnaúba'
      },
      {
        id: 3,
        src: '/foto3.jpg',
        alt: 'Alunos com o caderno',
        title: 'Desenvolvimento do Caderno de Campo',
        description: 'Estudantes desenvolvendo atividades práticas de campo para coleta de dados'
      }
    ];
  }

  // Exportar todos os dados
  exportData() {
    const data = {
      texts: {},
      gallery: this.loadGallery(),
      exportDate: new Date().toISOString()
    };

    // Coletar todos os textos salvos
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const id = key.replace(this.prefix, '');
        data.texts[id] = localStorage.getItem(key);
      }
    }

    return data;
  }

  // Importar dados
  importData(data) {
    try {
      if (data.texts) {
        Object.keys(data.texts).forEach(id => {
          this.saveText(id, data.texts[id]);
        });
      }

      if (data.gallery) {
        this.saveGallery(data.gallery);
      }

      return true;
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      return false;
    }
  }

  // Limpar todos os dados
  clearAllData() {
    try {
      // Remover todos os textos
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key);
        }
      }
      keys.forEach(key => localStorage.removeItem(key));

      // Remover galeria
      localStorage.removeItem(this.galleryKey);

      return true;
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      return false;
    }
  }

  // Estatísticas de uso
  getStats() {
    let textCount = 0;
    let totalSize = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        textCount++;
        totalSize += localStorage.getItem(key).length;
      }
    }

    const gallery = this.loadGallery();
    
    return {
      editedTexts: textCount,
      totalPhotos: gallery.length,
      dataSize: totalSize,
      lastUpdate: this.getLastUpdateTime()
    };
  }

  // Obter última atualização
  getLastUpdateTime() {
    try {
      const timestamp = localStorage.getItem(`${this.prefix}last_update`);
      return timestamp ? new Date(timestamp) : null;
    } catch (error) {
      return null;
    }
  }

  // Marcar última atualização
  markUpdate() {
    try {
      localStorage.setItem(`${this.prefix}last_update`, new Date().toISOString());
    } catch (error) {
      console.error('Erro ao marcar atualização:', error);
    }
  }
}

// Criar instância única (singleton)
const contentManager = new ContentManager();

export default contentManager;
