import { database } from '../../firebaseConfig';
import { ref, push, set, get, child, remove, update } from 'firebase/database';

// Serviço para gerenciar agentes no Firebase Realtime Database
export class AgentesService {
  
  // Cadastrar novo agente
  static async cadastrarAgente(dadosAgente) {
    try {
      const agentesRef = ref(database, 'agentes');
      const novoAgenteRef = push(agentesRef);
      
      const agente = {
        ...dadosAgente,
        id: novoAgenteRef.key,
        dataCadastro: new Date().toISOString(),
        ativo: true
      };
      
      await set(novoAgenteRef, agente);
      
      return {
        success: true,
        message: 'Agente cadastrado com sucesso!',
        agente: agente
      };
    } catch (error) {
      console.error('Erro ao cadastrar agente:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar agente. Tente novamente.',
        error: error.message
      };
    }
  }
  
  // Listar todos os agentes
  static async listarAgentes() {
    try {
      const agentesRef = ref(database, 'agentes');
      const snapshot = await get(agentesRef);
      
      if (snapshot.exists()) {
        const agentes = [];
        snapshot.forEach((childSnapshot) => {
          agentes.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        return {
          success: true,
          agentes: agentes
        };
      } else {
        return {
          success: true,
          agentes: []
        };
      }
    } catch (error) {
      console.error('Erro ao listar agentes:', error);
      return {
        success: false,
        message: 'Erro ao carregar agentes.',
        error: error.message,
        agentes: []
      };
    }
  }
  
  // Buscar agente por ID
  static async buscarAgentePorId(id) {
    try {
      const agenteRef = ref(database, `agentes/${id}`);
      const snapshot = await get(agenteRef);
      
      if (snapshot.exists()) {
        return {
          success: true,
          agente: {
            id: snapshot.key,
            ...snapshot.val()
          }
        };
      } else {
        return {
          success: false,
          message: 'Agente não encontrado.'
        };
      }
    } catch (error) {
      console.error('Erro ao buscar agente:', error);
      return {
        success: false,
        message: 'Erro ao buscar agente.',
        error: error.message
      };
    }
  }
  
  // Atualizar agente
  static async atualizarAgente(id, dadosAtualizados) {
    try {
      const agenteRef = ref(database, `agentes/${id}`);
      
      const atualizacao = {
        ...dadosAtualizados,
        dataAtualizacao: new Date().toISOString()
      };
      
      await update(agenteRef, atualizacao);
      
      return {
        success: true,
        message: 'Agente atualizado com sucesso!'
      };
    } catch (error) {
      console.error('Erro ao atualizar agente:', error);
      return {
        success: false,
        message: 'Erro ao atualizar agente.',
        error: error.message
      };
    }
  }
  
  // Excluir agente
  static async excluirAgente(id) {
    try {
      const agenteRef = ref(database, `agentes/${id}`);
      await remove(agenteRef);
      
      return {
        success: true,
        message: 'Agente excluído com sucesso!'
      };
    } catch (error) {
      console.error('Erro ao excluir agente:', error);
      return {
        success: false,
        message: 'Erro ao excluir agente.',
        error: error.message
      };
    }
  }
  
  // Atualizar status do agente (aprovado/rejeitado)
  static async atualizarStatusAgente(id, status, motivoRejeicao = null) {
    try {
      const agenteRef = ref(database, `agentes/${id}`);
      
      const updates = {
        status: status,
        dataAtualizacao: new Date().toISOString()
      };
      
      if (motivoRejeicao) {
        updates.motivoRejeicao = motivoRejeicao;
      }
      
      await update(agenteRef, updates);
      
      return {
        success: true,
        message: `Agente ${status} com sucesso!`
      };
    } catch (error) {
      console.error('Erro ao atualizar status do agente:', error);
      return {
        success: false,
        message: 'Erro ao atualizar status do agente.',
        error: error.message
      };
    }
  }
  
  // Contar total de agentes
  static async contarAgentes() {
    try {
      const agentesRef = ref(database, 'agentes');
      const snapshot = await get(agentesRef);
      
      return {
        success: true,
        total: snapshot.exists() ? snapshot.size : 0
      };
    } catch (error) {
      console.error('Erro ao contar agentes:', error);
      return {
        success: false,
        total: 0,
        error: error.message
      };
    }
  }
}
