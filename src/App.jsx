import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './ADM/AuthContext';
import ProtectedRoute from './ADM/ProtectedRoute';
import './App.css';
import HomePage from './HomePage';
import Carnauba from './Carnauba';
import ArvoresNativas from './ArvoresNativas';
import ADM from './ADM/ADM';
import Agentes from './Agentes';
import QuizPage from './QuizPage';

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
    path="/admin" 
    element={
      <ProtectedRoute>
        <ADM />
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