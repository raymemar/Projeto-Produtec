// Teste rápido da conectividade Firebase
import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

async function testFirebase() {
  try {
    console.log('Testando conexão Firebase...');
    console.log('db:', db);
    
    const testCollection = collection(db, 'test');
    console.log('Collection test criada:', testCollection);
    
    const testDoc = await addDoc(testCollection, {
      message: 'Teste de conectividade',
      timestamp: new Date()
    });
    
    console.log('Documento de teste criado com ID:', testDoc.id);
    return true;
  } catch (error) {
    console.error('Erro no teste Firebase:', error);
    return false;
  }
}

// Executar teste quando a página carregar
if (typeof window !== 'undefined') {
  window.testFirebase = testFirebase;
}

export default testFirebase;
