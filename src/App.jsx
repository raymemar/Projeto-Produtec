import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './ADM/AuthContext';
import ProtectedRoute from './ADM/ProtectedRoute';
import './App.css';
import HomePage from './HomePage';
import QuizPage from './QuizPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            {/* Adicione outras rotas protegidas aqui */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;