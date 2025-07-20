import { database } from '../../firebaseConfig';
import { 
  ref,
  push,
  set,
  get,
  remove,
  onValue,
  off
} from 'firebase/database';

class ArvoresService {
  constructor() {
    console.log('Inicializando ArvoresService...');
    console.log('database:', database);
    this.dbPath = 'arvores_nativas';
    this.dbRef = ref(database, this.dbPath);
    console.log('Database reference criada:', this.dbRef);
  }

  // Buscar todas as árvores
  async getAllArvores() {
    try {
      console.log('Buscando árvores do Realtime Database...');
      const snapshot = await get(this.dbRef);
      const data = snapshot.val();
      
      if (!data) {
        console.log('Nenhuma árvore encontrada');
        return [];
      }

      // Converter o objeto do Firebase para array
      const arvores = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      
      // Ordenar por data de criação (mais recente primeiro)
      arvores.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      console.log('Árvores encontradas:', arvores);
      return arvores;
    } catch (error) {
      console.error('Erro ao buscar árvores:', error);
      throw error;
    }
  }

  // Adicionar nova árvore
  async addArvore(arvoreData) {
    console.log('arvoresService.addArvore chamado com:', arvoreData);
    try {
      const newArvore = {
        ...arvoreData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Dados para Firebase:', newArvore);
      console.log('Database ref:', this.dbRef);
      
      // Usar push para gerar um ID único automaticamente
      const newRef = push(this.dbRef);
      await set(newRef, newArvore);
      
      console.log('Documento criado com ID:', newRef.key);
      
      const result = {
        id: newRef.key,
        ...newArvore
      };
      
      console.log('Retornando:', result);
      return result;
    } catch (error) {
      console.error('Erro ao adicionar árvore:', error);
      throw error;
    }
  }

  // Atualizar árvore existente
  async updateArvore(id, arvoreData) {
    try {
      const arvoreRef = ref(database, `${this.dbPath}/${id}`);
      const updatedData = {
        ...arvoreData,
        updatedAt: new Date().toISOString()
      };
      
      await set(arvoreRef, updatedData);
      
      return {
        id,
        ...updatedData
      };
    } catch (error) {
      console.error('Erro ao atualizar árvore:', error);
      throw error;
    }
  }

  // Remover árvore
  async deleteArvore(id) {
    try {
      const arvoreRef = ref(database, `${this.dbPath}/${id}`);
      await remove(arvoreRef);
      return true;
    } catch (error) {
      console.error('Erro ao remover árvore:', error);
      throw error;
    }
  }

  // Escutar mudanças em tempo real
  onArvoresChange(callback) {
    try {
      const unsubscribe = onValue(this.dbRef, (snapshot) => {
        const data = snapshot.val();
        
        if (!data) {
          callback([]);
          return;
        }

        // Converter o objeto do Firebase para array
        const arvores = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        // Ordenar por data de criação (mais recente primeiro)
        arvores.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        
        callback(arvores);
      });
      
      // Retornar função para cancelar a escuta
      return () => off(this.dbRef, 'value', unsubscribe);
    } catch (error) {
      console.error('Erro ao escutar mudanças:', error);
      throw error;
    }
  }

  // Validar dados da árvore
  validateArvoreData(arvoreData) {
    const errors = [];
    
    if (!arvoreData.name || arvoreData.name.trim().length === 0) {
      errors.push('Nome da árvore é obrigatório');
    }
    
    if (!arvoreData.description || arvoreData.description.trim().length === 0) {
      errors.push('Descrição da árvore é obrigatória');
    }
    
    if (!arvoreData.imageUrl || arvoreData.imageUrl.trim().length === 0) {
      errors.push('URL da imagem é obrigatória');
    }
    
    // Validar se a URL da imagem é válida
    try {
      new URL(arvoreData.imageUrl);
    } catch {
      errors.push('URL da imagem deve ser válida');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Método para migrar dados do localStorage para Firebase
  async migrateFromLocalStorage() {
    try {
      // Buscar dados do localStorage
      const localData = localStorage.getItem('produtec_trees');
      if (!localData) {
        console.log('Nenhum dado encontrado no localStorage');
        return [];
      }

      const localArvores = JSON.parse(localData);
      if (!Array.isArray(localArvores) || localArvores.length === 0) {
        console.log('Nenhuma árvore para migrar');
        return [];
      }

      // Verificar se já existem dados no Firebase
      const existingArvores = await this.getAllArvores();
      if (existingArvores.length > 0) {
        console.log('Dados já existem no Firebase, pulando migração');
        return existingArvores;
      }

      // Migrar cada árvore
      const migratedArvores = [];
      for (const arvore of localArvores) {
        try {
          const validation = this.validateArvoreData(arvore);
          if (validation.isValid) {
            const migratedArvore = await this.addArvore({
              name: arvore.name,
              description: arvore.description,
              imageUrl: arvore.imageUrl
            });
            migratedArvores.push(migratedArvore);
          } else {
            console.warn('Árvore inválida não migrada:', arvore, validation.errors);
          }
        } catch (error) {
          console.error('Erro ao migrar árvore:', arvore, error);
        }
      }

      console.log(`Migradas ${migratedArvores.length} árvores do localStorage para Firebase`);
      return migratedArvores;
    } catch (error) {
      console.error('Erro na migração:', error);
      throw error;
    }
  }

  // Backup dos dados para localStorage (fallback)
  async backupToLocalStorage() {
    try {
      const arvores = await this.getAllArvores();
      localStorage.setItem('produtec_trees_backup', JSON.stringify(arvores));
      return true;
    } catch (error) {
      console.error('Erro ao fazer backup:', error);
      return false;
    }
  }
}

// Criar instância única (singleton)
const arvoresService = new ArvoresService();

export default arvoresService;