import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './ADM/AuthContext';
import ProtectedRoute from './ADM/ProtectedRoute';
import './App.css';
import HomePage from './HomePage';
import ADM from './ADM/ADM';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
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