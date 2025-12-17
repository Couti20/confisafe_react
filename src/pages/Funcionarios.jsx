import React, { useState, useEffect } from 'react';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import usuarioService from '../services/usuarioService';
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/funcionarios.css';

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    cargo: '',
    departamento: '',
    telefone: '',
    ramal: '',
    senha: '',
  });

  // Carrega funcionários do backend ao montar componente
  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      setLoading(true);
      const data = await usuarioService.listar();
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
      alert('Erro ao carregar funcionários. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Total de Funcionários', value: funcionarios.length, icon: '👥' },
    { label: 'Cadastrados', value: funcionarios.filter(f => f.nomeCompleto).length, icon: '✅', type: 'success' },
  ];

  const handleOpenModal = (funcionario = null) => {
    if (funcionario) {
      setEditingId(funcionario.id);
      setFormData({
        nomeCompleto: funcionario.nomeCompleto || '',
        email: funcionario.email || '',
        cargo: funcionario.cargo || '',
        departamento: funcionario.departamento || '',
        telefone: funcionario.telefone || '',
        ramal: funcionario.ramal || '',
        senha: '',
      });
    } else {
      setEditingId(null);
      setFormData({
        nomeCompleto: '',
        email: '',
        cargo: '',
        departamento: '',
        telefone: '',
        ramal: '',
        senha: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      nomeCompleto: '',
      email: '',
      cargo: '',
      departamento: '',
      telefone: '',
      ramal: '',
      senha: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await usuarioService.atualizar(editingId, formData);
        alert('Funcionário atualizado com sucesso!');
      } else {
        await usuarioService.criar(formData);
        alert('Funcionário criado com sucesso!');
      }
      await carregarFuncionarios();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      alert(error.message || 'Erro ao salvar funcionário.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este funcionário?')) {
      return;
    }

    try {
      await usuarioService.remover(id);
      alert('Funcionário deletado com sucesso!');
      await carregarFuncionarios();
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      alert(error.message || 'Erro ao deletar funcionário.');
    }
  };

  return (
    <div className="page-funcionarios">
      <HeaderAuth />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          <div className="page-header">
            <h2>Gestão de Funcionários</h2>
            <p>Cadastre, edite e acompanhe os colaboradores autorizados a atuar em espaços confinados.</p>
          </div>

          <section className="section">
            <h3 className="section-title">Resumo dos Funcionários</h3>
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className={`stat-card ${stat.type ? `stat-card--${stat.type}` : ''}`}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Lista de Funcionários</h3>
              <button className="btn-primary" onClick={() => handleOpenModal()}>
                + Novo Funcionário
              </button>
            </div>

            <div className="table-wrapper">
              {loading ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando...</p>
              ) : funcionarios.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Nenhum funcionário cadastrado.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>Departamento</th>
                      <th>E-mail</th>
                      <th>Telefone</th>
                      <th style={{ width: '120px' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funcionarios.map((f) => (
                      <tr key={f.id}>
                        <td><strong>{f.nomeCompleto || 'Não informado'}</strong></td>
                        <td>{f.cargo || '-'}</td>
                        <td>{f.departamento || '-'}</td>
                        <td>{f.email}</td>
                        <td>{f.telefone || '-'}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn-icon" onClick={() => handleOpenModal(f)} title="Editar">
                            ✏️
                          </button>
                          <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(f.id)} title="Deletar">
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>

      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>

            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome completo *</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    placeholder="Ex: João Silva"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>E-mail corporativo *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="nome@empresa.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cargo</label>
                  <input
                    type="text"
                    name="cargo"
                    placeholder="Ex: Técnico de Segurança"
                    value={formData.cargo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Departamento</label>
                  <input
                    type="text"
                    name="departamento"
                    placeholder="Ex: Segurança do Trabalho"
                    value={formData.departamento}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Ramal</label>
                  <input
                    type="text"
                    name="ramal"
                    placeholder="Ex: 1234"
                    value={formData.ramal}
                    onChange={handleInputChange}
                  />
                </div>

                {!editingId && (
                  <div className="form-group">
                    <label>Senha *</label>
                    <input
                      type="password"
                      name="senha"
                      placeholder="Mínimo 8 caracteres"
                      value={formData.senha}
                      onChange={handleInputChange}
                      required={!editingId}
                    />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Funcionarios;
