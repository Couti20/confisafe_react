import React, { useState } from 'react';
import toast from 'react-hot-toast';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/gestao-epis.css';

const GestaoEpis = () => {
  const [activeTab, setActiveTab] = useState('loans');
  const [filter, setFilter] = useState('all');
  const [loans, setLoans] = useState([
    {
      id: 1,
      employee: { name: 'João Silva', role: 'Operador', avatar: 'JS', color: 'avatar-blue' },
      epi: 'Capacete de Segurança',
      patrimony: '#CAP-2024-042',
      borrowDate: '28/10/2024',
      dueDate: '04/11/2024',
      status: 'on-time',
      image: '🪖'
    },
    {
      id: 2,
      employee: { name: 'Maria Santos', role: 'Técnica', avatar: 'MS', color: 'avatar-orange' },
      epi: 'Luvas de Proteção',
      patrimony: '#LUV-2024-018',
      borrowDate: '20/10/2024',
      dueDate: '27/10/2024',
      status: 'late',
      days: 8,
      image: '🧤'
    },
    {
      id: 3,
      employee: { name: 'Carlos Oliveira', role: 'Manutenção', avatar: 'CO', color: 'avatar-red' },
      epi: 'Máscara Respiratória',
      patrimony: '#MAS-2024-007',
      borrowDate: '05/10/2024',
      dueDate: '12/10/2024',
      status: 'lost',
      days: 23,
      image: '😷'
    },
    {
      id: 4,
      employee: { name: 'Ana Costa', role: 'Supervisora', avatar: 'AC', color: 'avatar-green' },
      epi: 'Colete Refletivo',
      patrimony: '#COL-2024-033',
      borrowDate: '01/11/2024',
      dueDate: '08/11/2024',
      status: 'on-time',
      image: '🦺'
    },
  ]);

  const [lostItems, setLostItems] = useState([
    {
      id: 3,
      employee: { name: 'Carlos Oliveira', role: 'Manutenção', avatar: 'CO', color: 'avatar-red' },
      epi: 'Máscara Respiratória 3M 6200',
      patrimony: '#MAS-2024-007',
      borrowDate: '05/10/2024',
      dueDate: '12/10/2024',
      days: 23,
      note: 'Necessário para trabalho em espaço confinado'
    },
    {
      id: 5,
      employee: { name: 'Pedro Fernandes', role: 'Soldador', avatar: 'PF', color: 'avatar-orange' },
      epi: 'Capacete de Segurança MSA V-Gard',
      patrimony: '#CAP-2024-019',
      borrowDate: '15/10/2024',
      dueDate: '22/10/2024',
      days: 15,
      note: 'Crítico - Em falta há mais de 2 semanas'
    },
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, name: 'Capacete de Segurança', total: 45, available: 12, image: '🪖' },
    { id: 2, name: 'Luvas de Proteção', total: 120, available: 35, image: '🧤' },
    { id: 3, name: 'Máscara Respiratória', total: 80, available: 28, image: '😷' },
    { id: 4, name: 'Colete Refletivo', total: 55, available: 40, image: '🦺' },
    { id: 5, name: 'Óculos de Segurança', total: 90, available: 60, image: '🥽' },
  ]);

  const [history, setHistory] = useState([
    { id: 1, time: '12/10 14:30', action: 'Devolução Registrada', description: 'João Silva retornou Capacete #CAP-2024-042' },
    { id: 2, time: '11/10 09:15', action: 'Empréstimo Realizado', description: 'Ana Costa pegou Colete Refletivo #COL-2024-033' },
    { id: 3, time: '10/10 16:45', action: 'Alerta Gerado', description: 'Maria Santos atrasou devolução de Luvas #LUV-2024-018' },
    { id: 4, time: '09/10 11:20', action: 'Relatório Criado', description: 'Inventário atualizado - 8 itens faltando' },
  ]);

  const getStatusBadge = (status, days) => {
    if (status === 'on-time') return { text: 'No prazo', class: 'badge-success' };
    if (status === 'late') return { text: `Atrasado ${days} dias`, class: 'badge-warning' };
    if (status === 'lost') return { text: `Não devolvido ${days} dias`, class: 'badge-danger' };
    return { text: 'Desconhecido', class: 'badge-success' };
  };

  const handleReturnEPI = (id) => {
    setLoans(loans.filter(l => l.id !== id));
    toast.success('Devolução registrada com sucesso!');
  };

  const handleReportLost = (id) => {
    const lost = loans.find(l => l.id === id);
    if (lost) {
      setLostItems([...lostItems, { ...lost, days: 23, note: 'Marcado como perdido' }]);
      setLoans(loans.filter(l => l.id !== id));
    }
    toast.error('EPI marcado como perdido.');
  };

  const handleSendReminder = (id) => {
    toast.success('Lembrete enviado para o funcionário!');
  };

  const handleViewLoanDetails = (id) => {
    toast('Detalhes do empréstimo #' + id, { icon: '📋' });
  };

  const handleOpenLoanModal = () => {
    toast('Funcionalidade em desenvolvimento', { icon: '🚧' });
  };

  const handleViewLostItems = () => {
    setActiveTab('lost');
  };

  const filteredLoans = filter === 'all' ? loans : loans.filter(l => l.status.includes(filter));

  return (
    <div className="page-gestao-epis">
      <HeaderAuth />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Gestão de EPIs</h2>
              <p>Controle de empréstimos, devoluções e inventário</p>
            </div>
            <div className="header-actions">
              <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Todos os Status</option>
                <option value="on-time">No Prazo</option>
                <option value="late">Atrasados</option>
                <option value="lost">Perdidos/Não Devolvidos</option>
              </select>
              <button className="btn-primary" onClick={handleOpenLoanModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Novo Empréstimo
              </button>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="alert-banner alert-banner--danger">
            <div className="alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <circle cx="12" cy="17" r="0.5" fill="currentColor" />
              </svg>
            </div>
            <div className="alert-content">
              <strong>8 EPIs não devolvidos há mais de 7 dias</strong>
              <p>3 capacetes, 2 luvas e 3 máscaras - Ação necessária para conformidade</p>
            </div>
            <button className="btn-alert" onClick={handleViewLostItems}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Ver Itens
            </button>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card summary-card--blue">
              <div className="summary-icon-wrapper summary-icon-wrapper--blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">285</span>
                <span className="summary-label">Total em Estoque</span>
                <span className="summary-trend">125 disponíveis</span>
              </div>
            </div>

            <div className="summary-card summary-card--warning">
              <div className="summary-icon-wrapper summary-icon-wrapper--warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">160</span>
                <span className="summary-label">EPIs Emprestados</span>
                <span className="summary-trend trend-up">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  +12 hoje
                </span>
              </div>
            </div>

            <div className="summary-card summary-card--danger">
              <div className="summary-icon-wrapper summary-icon-wrapper--danger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">8</span>
                <span className="summary-label">Não Devolvidos</span>
                <span className="summary-trend trend-down">Requer atenção</span>
              </div>
            </div>

            <div className="summary-card summary-card--success">
              <div className="summary-icon-wrapper summary-icon-wrapper--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="summary-info">
                <span className="summary-value">142</span>
                <span className="summary-label">Devoluções no Prazo</span>
                <span className="summary-trend">88.8%</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
                onClick={() => setActiveTab('loans')}
              >
                Empréstimos
              </button>
              <button
                className={`tab-btn ${activeTab === 'lost' ? 'active' : ''}`}
                onClick={() => setActiveTab('lost')}
              >
                Não Devolvidos/Perdidos
              </button>
              <button
                className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                onClick={() => setActiveTab('inventory')}
              >
                Inventário
              </button>
              <button
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Histórico
              </button>
            </div>

            {/* Tab: Empréstimos */}
            {activeTab === 'loans' && (
              <div className="tab-content active">
                <div className="table-container">
                  <table className="epi-table">
                    <thead>
                      <tr>
                        <th>Funcionário</th>
                        <th>EPI</th>
                        <th>Patrimônio</th>
                        <th>Data Empréstimo</th>
                        <th>Previsão Devolução</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLoans.map((loan) => {
                        const statusBadge = getStatusBadge(loan.status, loan.days);
                        return (
                          <tr key={loan.id}>
                            <td>
                              <div className="employee-cell">
                                <div className={`avatar ${loan.employee.color}`}>{loan.employee.avatar}</div>
                                <div>
                                  <strong>{loan.employee.name}</strong>
                                  <span>{loan.employee.role}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="epi-cell">
                                <span style={{ fontSize: '1.2rem' }}>{loan.image}</span>
                                <span>{loan.epi}</span>
                              </div>
                            </td>
                            <td>
                              <span className="patrimony">{loan.patrimony}</span>
                            </td>
                            <td>{loan.borrowDate}</td>
                            <td>{loan.dueDate}</td>
                            <td>
                              <span className={`badge ${statusBadge.class}`}>{statusBadge.text}</span>
                            </td>
                            <td>
                              <div className="action-btns">
                                <button
                                  className="btn-icon btn-icon-success"
                                  onClick={() => handleReturnEPI(loan.id)}
                                  title="Registrar devolução"
                                >
                                  ✓
                                </button>
                                {loan.status === 'late' && (
                                  <button
                                    className="btn-icon btn-icon-warning"
                                    onClick={() => handleSendReminder(loan.id)}
                                    title="Enviar lembrete"
                                  >
                                    🔔
                                  </button>
                                )}
                                {loan.status === 'lost' && (
                                  <>
                                    <button
                                      className="btn-icon btn-icon-danger"
                                      onClick={() => handleReportLost(loan.id)}
                                      title="Marcar como perdido"
                                    >
                                      ✕
                                    </button>
                                    <button
                                      className="btn-icon btn-icon-warning"
                                      onClick={() => handleSendReminder(loan.id)}
                                      title="Enviar cobrança"
                                    >
                                      ⚠️
                                    </button>
                                  </>
                                )}
                                {loan.status === 'on-time' && (
                                  <button
                                    className="btn-icon"
                                    onClick={() => handleViewLoanDetails(loan.id)}
                                    title="Ver detalhes"
                                  >
                                    👁️
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Não Devolvidos/Perdidos */}
            {activeTab === 'lost' && (
              <div className="tab-content active">
                <div className="lost-items-section">
                  <div className="lost-summary">
                    <div className="lost-summary-card">
                      <h3>⚠️ Total Não Devolvidos</h3>
                      <p className="lost-value">{lostItems.length}</p>
                      <span className="lost-count">Equipamentos pendentes</span>
                    </div>
                    <div className="lost-summary-card">
                      <h3>⏱️ Tempo Médio Atraso</h3>
                      <p className="lost-value">18 dias</p>
                      <span className="lost-count">Maior atraso: 23 dias</span>
                    </div>
                    <div className="lost-summary-card">
                      <h3>👤 Funcionários</h3>
                      <p className="lost-value">{lostItems.length}</p>
                      <span className="lost-count">Com pendências ativas</span>
                    </div>
                  </div>

                  <div className="lost-items-list">
                    {lostItems.map((item) => (
                      <div className="lost-item" key={item.id}>
                        <div className="lost-item-header">
                          <div className="employee-cell">
                            <div className={`avatar ${item.employee.color}`}>{item.employee.avatar}</div>
                            <div>
                              <strong>{item.employee.name}</strong>
                              <span>{item.employee.role}</span>
                            </div>
                          </div>
                          <span className="badge badge-danger">{item.days} dias de atraso</span>
                        </div>
                        <div className="lost-item-details">
                          <div className="epi-info-row">
                            <div style={{ fontSize: '2rem' }}>{item.image}</div>
                            <div>
                              <strong>{item.epi}</strong>
                              <p>Patrimônio: {item.patrimony}</p>
                              <p>Empréstimo: {item.borrowDate} | Previsão: {item.dueDate}</p>
                              <p className="info-highlight">⚠️ {item.note}</p>
                            </div>
                          </div>
                          <div className="lost-item-actions">
                            <button className="btn-secondary" onClick={() => handleSendReminder(item.id)}>
                              Enviar Cobrança
                            </button>
                            <button className="btn-danger" onClick={() => handleReportLost(item.id)}>
                              Marcar como Perdido
                            </button>
                            <button className="btn-primary" onClick={() => handleReturnEPI(item.id)}>
                              Registrar Devolução
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Inventário */}
            {activeTab === 'inventory' && (
              <div className="tab-content active">
                <div className="inventory-section">
                  {inventory.map((item) => (
                    <div className="inventory-card" key={item.id}>
                      <div style={{ fontSize: '3rem' }}>{item.image}</div>
                      <div className="inventory-name">{item.name}</div>
                      <div className="inventory-quantity">
                        <div className="quantity-badge quantity-available">
                          {item.available} Disponíveis
                        </div>
                        <div className="quantity-badge quantity-total">
                          {item.total} Total
                        </div>
                      </div>
                      <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Gerenciar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Histórico */}
            {activeTab === 'history' && (
              <div className="tab-content active">
                <div className="history-timeline">
                  {history.map((item) => (
                    <div className="history-item" key={item.id}>
                      <div className="history-time">{item.time}</div>
                      <div className="history-content">
                        <strong>{item.action}</strong>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default GestaoEpis;
