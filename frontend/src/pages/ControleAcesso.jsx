import React, { useState } from 'react';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/controle-acesso.css';

const ControleAcesso = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    area: '',
    nivelAcesso: 'Nível 2',
    status: 'ativo',
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Operador de Máquinas',
      area: 'Setor de Produção',
      dataCadastro: '15/01/2024',
      nivelAcesso: 'Nível 2',
      status: 'ativo',
      historico: [
        { data: '15/01/2024 10:30', acao: 'Cadastro inicial', usuario: 'Sistema' }
      ]
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Técnica de Laboratório',
      area: 'Laboratório Químico',
      dataCadastro: '20/02/2024',
      nivelAcesso: 'Nível 3',
      status: 'ativo',
      historico: [
        { data: '20/02/2024 14:15', acao: 'Cadastro inicial', usuario: 'Sistema' },
        { data: '25/03/2024 09:20', acao: 'Nível de acesso: Nível 2 → Nível 3', usuario: 'Admin' }
      ]
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      cargo: 'Auxiliar de Manutenção',
      area: 'Manutenção',
      dataCadastro: '10/03/2024',
      nivelAcesso: 'Nível 1',
      status: 'bloqueado',
      historico: [
        { data: '10/03/2024 11:00', acao: 'Cadastro inicial', usuario: 'Sistema' },
        { data: '05/11/2024 16:45', acao: 'Status: Ativo → Bloqueado', usuario: 'Admin' }
      ]
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Supervisora',
      area: 'Administrativo',
      dataCadastro: '05/01/2024',
      nivelAcesso: 'Nível 4',
      status: 'ativo',
      historico: [
        { data: '05/01/2024 08:00', acao: 'Cadastro inicial', usuario: 'Sistema' }
      ]
    },
  ]);

  const [securityAlerts, setSecurityAlerts] = useState([
    {
      id: 1,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      title: 'Tentativa de Acesso Não Autorizado',
      desc: 'Usuário tentou acessar área restrita sem permissão adequada',
      time: 'Há 15 minutos',
      location: 'Portão Principal',
      type: 'high',
      resolved: false,
    },
    {
      id: 2,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Horário de Acesso Incomum',
      desc: 'Acesso detectado fora do horário comercial estabelecido',
      time: 'Há 2 horas',
      location: 'Setor Administrativo',
      type: 'medium',
      resolved: false,
    },
    {
      id: 3,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      ),
      title: 'Credencial Próxima do Vencimento',
      desc: '3 credenciais de acesso expiram nos próximos 7 dias',
      time: 'Hoje',
      location: 'Sistema Principal',
      type: 'info',
      resolved: false,
    },
  ]);

  const stats = [
    { 
      label: 'Usuários Ativos', 
      value: employees.filter(e => e.status === 'ativo').length, 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ), 
      trend: '+5%', 
      trendType: 'up',
      color: 'blue'
    },
    { 
      label: 'Acessos Hoje', 
      value: 42, 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          <polyline points="10 17 15 12 10 7"/>
          <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
      ), 
      trend: '0%', 
      trendType: 'neutral',
      color: 'green'
    },
    { 
      label: 'Tentativas Bloqueadas', 
      value: 3, 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </svg>
      ), 
      trend: '+50%', 
      trendType: 'down', 
      type: 'warning',
      color: 'orange'
    },
    { 
      label: 'Conformidade', 
      value: '98%', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ), 
      trend: '+2%', 
      trendType: 'up', 
      type: 'success',
      color: 'success'
    },
  ];

  const itemsPerPage = 5;
  
  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.area.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchFilter = filterType === 'all' || emp.status === filterType;
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getTimestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getChanges = (oldData, newData) => {
    const changes = [];
    if (oldData.nome !== newData.nome) changes.push(`Nome: ${oldData.nome} → ${newData.nome}`);
    if (oldData.cargo !== newData.cargo) changes.push(`Cargo: ${oldData.cargo} → ${newData.cargo}`);
    if (oldData.area !== newData.area) changes.push(`Área: ${oldData.area} → ${newData.area}`);
    if (oldData.nivelAcesso !== newData.nivelAcesso) changes.push(`Nível: ${oldData.nivelAcesso} → ${newData.nivelAcesso}`);
    if (oldData.status !== newData.status) changes.push(`Status: ${oldData.status} → ${newData.status}`);
    return changes;
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja remover este acesso?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const handleAllowAccess = (id) => {
    if (window.confirm('Deseja liberar o acesso deste funcionário?')) {
      setEmployees(employees.map(e => {
        if (e.id === id) {
          return {
            ...e,
            status: 'ativo',
            historico: [...e.historico, { data: getTimestamp(), acao: 'Status: Bloqueado → Ativo', usuario: 'Admin' }]
          };
        }
        return e;
      }));
    }
  };

  const handleResolveAlert = (alertId) => {
    setSecurityAlerts(securityAlerts.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const handleViewDetails = (employee) => {
    setViewingEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleOpenModal = (employee) => {
    if (employee) {
      setEditingId(employee.id);
      setFormData({
        nome: employee.nome,
        cargo: employee.cargo,
        area: employee.area,
        nivelAcesso: employee.nivelAcesso,
        status: employee.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        nome: '',
        cargo: '',
        area: '',
        nivelAcesso: 'Nível 2',
        status: 'ativo',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nome: '', cargo: '', area: '', nivelAcesso: 'Nível 2', status: 'ativo' });
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setViewingEmployee(null);
  };

  const handleSaveEmployee = () => {
    if (!formData.nome.trim() || !formData.cargo.trim() || !formData.area.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (editingId) {
      const oldEmployee = employees.find(e => e.id === editingId);
      const changes = getChanges(oldEmployee, formData);
      
      setEmployees(employees.map(e => {
        if (e.id === editingId) {
          const updatedHistorico = [...e.historico];
          if (changes.length > 0) {
            changes.forEach(change => {
              updatedHistorico.push({ data: getTimestamp(), acao: change, usuario: 'Admin' });
            });
          }
          return { ...e, ...formData, historico: updatedHistorico };
        }
        return e;
      }));
      
      alert('Funcionário atualizado com sucesso!');
    } else {
      const newEmployee = {
        id: Math.max(...employees.map(e => e.id), 0) + 1,
        ...formData,
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        historico: [{ data: getTimestamp(), acao: 'Cadastro inicial', usuario: 'Admin' }]
      };
      setEmployees([...employees, newEmployee]);
      alert('Funcionário adicionado com sucesso!');
    }

    handleCloseModal();
  };

  return (
    <div className="page-controle-acesso">
      <HeaderAuth />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          <div className="page-header">
            <div className="header-info">
              <h1 className="page-title">Controle de Acesso</h1>
              <p className="page-subtitle">Gerencie e monitore os acessos aos sistemas e áreas restritas</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Exportar
              </button>
              <button className="btn btn-primary" onClick={() => handleOpenModal(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar Funcionário
              </button>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className={`stat-card stat-card--${stat.color || 'default'}`}>
                <div className="stat-header">
                  <div className={`stat-icon-wrapper stat-icon-wrapper--${stat.color || 'default'}`}>
                    <span className="stat-icon">{stat.icon}</span>
                  </div>
                  <div className={`stat-trend stat-trend--${stat.trendType}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      {stat.trendType === 'up' && <polyline points="18 15 12 9 6 15"/>}
                      {stat.trendType === 'down' && <polyline points="6 9 12 15 18 9"/>}
                      {stat.trendType === 'neutral' && <line x1="5" y1="12" x2="19" y2="12"/>}
                    </svg>
                    <span>{stat.trend}</span>
                  </div>
                </div>
                <div className="stat-body">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="control-bar">
            <div className="search-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nome, cargo ou área..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <button className={`filter-chip ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>
                Todos<span className="chip-count">{employees.length}</span>
              </button>
              <button className={`filter-chip ${filterType === 'ativo' ? 'active' : ''}`} onClick={() => setFilterType('ativo')}>
                Ativos<span className="chip-count">{employees.filter(e => e.status === 'ativo').length}</span>
              </button>
              <button className={`filter-chip ${filterType === 'bloqueado' ? 'active' : ''}`} onClick={() => setFilterType('bloqueado')}>
                Bloqueados<span className="chip-count">{employees.filter(e => e.status === 'bloqueado').length}</span>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Funcionários Cadastrados</h2>
              <span className="result-count">{filteredEmployees.length} resultado(s)</span>
            </div>
            <div className="card-body">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Funcionário</th>
                      <th>Área</th>
                      <th>Data Cadastro</th>
                      <th>Nível Acesso</th>
                      <th>Status</th>
                      <th className="text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEmployees.length > 0 ? (
                      paginatedEmployees.map((emp) => (
                        <tr key={emp.id} className="table-row">
                          <td>
                            <div className="employee-info">
                              <div className="employee-avatar">{getInitials(emp.nome)}</div>
                              <div className="employee-details">
                                <span className="employee-name">{emp.nome}</span>
                                <span className="employee-role">{emp.cargo}</span>
                              </div>
                            </div>
                          </td>
                          <td><span className="text-secondary">{emp.area}</span></td>
                          <td><span className="text-secondary">{emp.dataCadastro}</span></td>
                          <td><span className="badge badge-blue">{emp.nivelAcesso}</span></td>
                          <td>
                            <span className={`status-badge status-${emp.status}`}>
                              <span className="status-dot"></span>
                              {emp.status === 'ativo' ? 'Ativo' : 'Bloqueado'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-btn action-btn-view" title="Ver detalhes" onClick={() => handleViewDetails(emp)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </button>
                              {emp.status === 'bloqueado' ? (
                                <button className="action-btn action-btn-success" title="Liberar" onClick={() => handleAllowAccess(emp.id)}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </button>
                              ) : (
                                <button className="action-btn action-btn-edit" title="Editar" onClick={() => handleOpenModal(emp)}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                              )}
                              <button className="action-btn action-btn-delete" title="Excluir" onClick={() => handleDelete(emp.id)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center empty-state">
                          <div className="empty-icon">🔍</div>
                          <p>Nenhum funcionário encontrado</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button className="pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Anterior
                  </button>
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button key={page} className={`pagination-number ${currentPage === page ? 'active' : ''}`} onClick={() => handlePageChange(page)}>
                        {page}
                      </button>
                    ))}
                  </div>
                  <button className="pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próxima
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Alertas de Segurança</h2>
              {securityAlerts.filter(a => !a.resolved).length > 0 && (
                <span className="alert-badge">{securityAlerts.filter(a => !a.resolved).length} novo(s)</span>
              )}
            </div>
            <div className="card-body">
              <div className="alerts-container">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className={`alert-item alert-${alert.type} ${alert.resolved ? 'alert-resolved' : ''}`}>
                    <div className="alert-icon-wrapper">
                      <span className="alert-emoji">{alert.icon}</span>
                    </div>
                    <div className="alert-content">
                      <h4 className="alert-title">{alert.title}</h4>
                      <p className="alert-description">{alert.desc}</p>
                      <div className="alert-metadata">
                        <span className="metadata-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {alert.time}
                        </span>
                        <span className="metadata-divider">•</span>
                        <span className="metadata-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {alert.location}
                        </span>
                      </div>
                    </div>
                    <button className={`alert-action-btn ${alert.resolved ? 'resolved' : ''}`} onClick={() => handleResolveAlert(alert.id)} disabled={alert.resolved}>
                      {alert.resolved ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Resolvido
                        </>
                      ) : ('Resolver')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal modal-edit" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{editingId ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h3>
                <p className="modal-subtitle">{editingId ? 'Atualize as informações' : 'Preencha os dados do novo funcionário'}</p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nome Completo <span className="required">*</span></label>
                  <input type="text" className="form-input" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} placeholder="Ex: João Silva" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Cargo <span className="required">*</span></label>
                  <input type="text" className="form-input" value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })} placeholder="Ex: Operador de Máquinas" />
                </div>
                <div className="form-group">
                  <label className="form-label">Área/Departamento <span className="required">*</span></label>
                  <input type="text" className="form-input" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder="Ex: Setor de Produção" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nível de Acesso</label>
                  <select className="form-select" value={formData.nivelAcesso} onChange={(e) => setFormData({ ...formData, nivelAcesso: e.target.value })}>
                    <option value="Nível 1">Nível 1 - Básico</option>
                    <option value="Nível 2">Nível 2 - Intermediário</option>
                    <option value="Nível 3">Nível 3 - Avançado</option>
                    <option value="Nível 4">Nível 4 - Administrador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <option value="ativo">Ativo</option>
                    <option value="bloqueado">Bloqueado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSaveEmployee}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && viewingEmployee && (
        <div className="modal-backdrop" onClick={handleCloseDetailsModal}>
          <div className="modal modal-details" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Detalhes do Funcionário</h3>
                <p className="modal-subtitle">Informações completas e histórico</p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseDetailsModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="details-header">
                <div className="details-avatar-large">{getInitials(viewingEmployee.nome)}</div>
                <div className="details-main-info">
                  <h2 className="details-name">{viewingEmployee.nome}</h2>
                  <p className="details-role">{viewingEmployee.cargo}</p>
                  <span className={`status-badge status-${viewingEmployee.status}`}>
                    <span className="status-dot"></span>
                    {viewingEmployee.status === 'ativo' ? 'Ativo' : 'Bloqueado'}
                  </span>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div>
                    <span className="detail-label">Nome Completo</span>
                    <span className="detail-value">{viewingEmployee.nome}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <div>
                    <span className="detail-label">Cargo</span>
                    <span className="detail-value">{viewingEmployee.cargo}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <div>
                    <span className="detail-label">Área</span>
                    <span className="detail-value">{viewingEmployee.area}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div>
                    <span className="detail-label">Data Cadastro</span>
                    <span className="detail-value">{viewingEmployee.dataCadastro}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <div>
                    <span className="detail-label">Nível Acesso</span>
                    <span className="detail-value">
                      <span className="badge badge-blue">{viewingEmployee.nivelAcesso}</span>
                    </span>
                  </div>
                </div>
                <div className="detail-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <span className="detail-label">Status</span>
                    <span className="detail-value">{viewingEmployee.status === 'ativo' ? '✓ Ativo' : '✕ Bloqueado'}</span>
                  </div>
                </div>
              </div>

              <div className="history-section">
                <h4 className="history-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Histórico de Alterações
                </h4>
                <div className="timeline">
                  {viewingEmployee.historico.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <p className="timeline-action">{item.acao}</p>
                        <div className="timeline-meta">
                          <span className="timeline-date">{item.data}</span>
                          <span className="timeline-divider">•</span>
                          <span className="timeline-user">por {item.usuario}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseDetailsModal}>Fechar</button>
              <button className="btn btn-primary" onClick={() => { handleCloseDetailsModal(); handleOpenModal(viewingEmployee); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ControleAcesso;