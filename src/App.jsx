import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './ADM/AuthContext';
import ProtectedRoute from './ADM/ProtectedRoute';
import './App.css';
import HomePage from './HomePage';
import Carnauba from './Carnauba';
import ArvoresNativas from './ArvoresNativas';
import Agentes from './Agentes';
import QuizPage from './QuizPage';
import GerenciadorAgentes from './components/GerenciadorAgentes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
       <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/carnauba" element={<Carnauba />} />
  <Route path="/arvores-nativas" element={<ArvoresNativas />} />
  <Route path='/agentes' element={<Agentes />} />
  <Route path='/quiz' element={<QuizPage />} />
  <Route 
    path="/gerenciador-agentes" 
    element={
      <ProtectedRoute>
        <GerenciadorAgentes />
      </ProtectedRoute>
    } 
  />
</Routes> 
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;