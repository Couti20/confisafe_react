import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Contato from './pages/Contato';
import Inicial from './pages/Inicial';
import Funcionarios from './pages/Funcionarios';
import EPIs from './pages/EPIs';
import ControleAcesso from './pages/ControleAcesso';
import Treinamento from './pages/Treinamento';
import GestaoEpis from './pages/GestaoEpis';
import Relatorio from './pages/Relatorio';
import Configuracoes from './pages/Configuracoes';
import EsqueciSenha from './pages/EsqueciSenha';
import Servicos from './pages/Servicos';
import './styles/tokens.css';
import './styles/base.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/servicos" element={<Servicos />} />
        
        {/* Rotas Protegidas - Requerem autenticação */}
        <Route path="/inicial" element={<PrivateRoute><Inicial /></PrivateRoute>} />
        <Route path="/funcionarios" element={<PrivateRoute><Funcionarios /></PrivateRoute>} />
        <Route path="/epis" element={<PrivateRoute><EPIs /></PrivateRoute>} />
        <Route path="/controle-acesso" element={<PrivateRoute><ControleAcesso /></PrivateRoute>} />
        <Route path="/treinamento" element={<PrivateRoute><Treinamento /></PrivateRoute>} />
        <Route path="/gestao-epis" element={<PrivateRoute><GestaoEpis /></PrivateRoute>} />
        <Route path="/relatorio" element={<PrivateRoute><Relatorio /></PrivateRoute>} />
        <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
        
        {/* Rota padrão */}
        <Route path="/" element={<Navigate to="/servicos" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
