import { database } from '../../firebaseConfig';
import { ref, push, set, get, child, remove, update } from 'firebase/database';

// Serviço para gerenciar pessoas da galeria no Firebase Realtime Database
export class PessoasService {
  
  // Adicionar nova pessoa à galeria
  static async adicionarPessoa(dadosPessoa) {
    try {
      const pessoasRef = ref(database, 'pessoas');
      const novaPessoaRef = push(pessoasRef);
      
      const pessoa = {
        ...dadosPessoa,
        id: novaPessoaRef.key,
        dataCriacao: new Date().toISOString(),
        tipo: 'galeria' // Para diferenciar de outros tipos futuros
      };
      
      await set(novaPessoaRef, pessoa);
      
      return {
        success: true,
        message: 'Pessoa adicionada à galeria com sucesso!',
        pessoa: pessoa
      };
    } catch (error) {
      console.error('Erro ao adicionar pessoa:', error);
      return {
        success: false,
        message: 'Erro ao adicionar pessoa à galeria. Tente novamente.',
        error: error.message
      };
    }
  }
  
  // Listar todas as pessoas da galeria
  static async listarPessoas() {
    try {
      const pessoasRef = ref(database, 'pessoas');
      const snapshot = await get(pessoasRef);
      
      if (snapshot.exists()) {
        const pessoas = [];
        snapshot.forEach((childSnapshot) => {
          pessoas.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        // Ordenar por data de criação (mais recentes primeiro)
        pessoas.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
        
        return {
          success: true,
          pessoas: pessoas
        };
      } else {
        return {
          success: true,
          pessoas: []
        };
      }
    } catch (error) {
      console.error('Erro ao listar pessoas:', error);
      return {
        success: false,
        message: 'Erro ao carregar pessoas da galeria.',
        error: error.message,
        pessoas: []
      };
    }
  }
  
  // Buscar pessoa por ID
  static async buscarPessoaPorId(id) {
    try {
      const pessoaRef = ref(database, `pessoas/${id}`);
      const snapshot = await get(pessoaRef);
      
      if (snapshot.exists()) {
        return {
          success: true,
          pessoa: {
            id: snapshot.key,
            ...snapshot.val()
          }
        };
      } else {
        return {
          success: false,
          message: 'Pessoa não encontrada.'
        };
      }
    } catch (error) {
      console.error('Erro ao buscar pessoa:', error);
      return {
        success: false,
        message: 'Erro ao buscar pessoa.',
        error: error.message
      };
    }
  }
  
  // Atualizar dados de uma pessoa
  static async atualizarPessoa(id, dadosAtualizados) {
    try {
      const pessoaRef = ref(database, `pessoas/${id}`);
      
      const atualizacao = {
        ...dadosAtualizados,
        dataAtualizacao: new Date().toISOString()
      };
      
      await update(pessoaRef, atualizacao);
      
      return {
        success: true,
        message: 'Pessoa atualizada com sucesso!'
      };
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
      return {
        success: false,
        message: 'Erro ao atualizar pessoa.',
        error: error.message
      };
    }
  }
  
  // Excluir pessoa da galeria
  static async excluirPessoa(id) {
    try {
      const pessoaRef = ref(database, `pessoas/${id}`);
      await remove(pessoaRef);
      
      return {
        success: true,
        message: 'Pessoa removida da galeria com sucesso!'
      };
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
      return {
        success: false,
        message: 'Erro ao remover pessoa da galeria.',
        error: error.message
      };
    }
  }
  
  // Contar total de pessoas na galeria
  static async contarPessoas() {
    try {
      const pessoasRef = ref(database, 'pessoas');
      const snapshot = await get(pessoasRef);
      
      return {
        success: true,
        total: snapshot.exists() ? snapshot.size : 0
      };
    } catch (error) {
      console.error('Erro ao contar pessoas:', error);
      return {
        success: false,
        total: 0,
        error: error.message
      };
    }
  }
}
