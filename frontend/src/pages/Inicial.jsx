import React, { useState, useEffect } from 'react';
import HeaderAuth from '../components/Layout/HeaderAuth';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import '../styles/header.css';
import '../styles/sidebar.css';
import '../styles/layout.css';
import '../styles/inicial.css';

const Inicial = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Estado das câmeras/setores - persistido no localStorage
  const [cameras, setCameras] = useState(() => {
    const saved = localStorage.getItem('confisafe_cameras');
    return saved ? JSON.parse(saved) : [
      { id: 1, nome: 'Setor A - Máquinas', url: '', status: 'ativo', pessoas: 12 },
      { id: 2, nome: 'Setor B - Montagem', url: '', status: 'ativo', pessoas: 8 },
    ];
  });

  // Estado do modal de adicionar setor
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSector, setNewSector] = useState({ nome: '', url: '' });

  // Estado para câmera em tela cheia
  const [fullscreenCamera, setFullscreenCamera] = useState(null);

  // Estado para edição de câmera
  const [editingCamera, setEditingCamera] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Persistir câmeras no localStorage
  useEffect(() => {
    localStorage.setItem('confisafe_cameras', JSON.stringify(cameras));
  }, [cameras]);

  // Adicionar nova câmera/setor
  const handleAddSector = () => {
    if (!newSector.nome.trim()) {
      alert('Por favor, informe o nome do setor.');
      return;
    }

    const newCamera = {
      id: Date.now(),
      nome: newSector.nome,
      url: newSector.url || '',
      status: 'ativo',
      pessoas: 0,
    };

    setCameras([...cameras, newCamera]);
    setNewSector({ nome: '', url: '' });
    setShowAddModal(false);
  };

  // Remover câmera/setor
  const handleRemoveCamera = (id) => {
    if (window.confirm('Tem certeza que deseja remover este setor?')) {
      setCameras(cameras.filter(c => c.id !== id));
    }
  };

  // Editar câmera/setor
  const handleEditCamera = (camera) => {
    setEditingCamera({ ...camera });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingCamera.nome.trim()) {
      alert('Por favor, informe o nome do setor.');
      return;
    }

    setCameras(cameras.map(c => c.id === editingCamera.id ? editingCamera : c));
    setEditingCamera(null);
    setShowEditModal(false);
  };

  // Toggle status da câmera
  const toggleCameraStatus = (id) => {
    setCameras(cameras.map(c => 
      c.id === id ? { ...c, status: c.status === 'ativo' ? 'inativo' : 'ativo' } : c
    ));
  };

  // Tela cheia
  const openFullscreen = (camera) => {
    setFullscreenCamera(camera);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenCamera(null);
    document.body.style.overflow = 'auto';
  };

  // Fechar tela cheia com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && fullscreenCamera) {
        closeFullscreen();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [fullscreenCamera]);

  const stats = [
    { 
      label: 'Funcionários Ativos', 
      value: '48', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>, 
      className: 'stat-card--blue' 
    },
    { 
      label: 'Conformidade EPI', 
      value: '92%', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>, 
      className: 'stat-card--success' 
    },
    { 
      label: 'Alertas Ativos', 
      value: '3', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>, 
      className: 'stat-card--warning' 
    },
    { 
      label: 'Câmeras Ativas', 
      value: cameras.filter(c => c.status === 'ativo').length.toString(), 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>, 
      className: 'stat-card--success' 
    },
  ];

  const alerts = [
    {
      id: 1,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>,
      title: 'Capacete sem certificação',
      desc: 'Setor de Produção - Hoje às 14:30',
      time: 'Há 2 horas',
      type: 'high',
    },
    {
      id: 2,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>,
      title: 'Treinamento pendente',
      desc: '5 funcionários - NR-33 vence em 3 dias',
      time: 'Há 1 dia',
      type: 'medium',
    },
    {
      id: 3,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>,
      title: 'Relatório mensal',
      desc: 'Relatório de segurança pendente',
      time: 'Há 3 dias',
      type: 'info',
    },
  ];

  return (
    <div className="page-inicial">
      <HeaderAuth />

      <div className="layout">
        <Sidebar isOpen={sidebarOpen} />

        <main className="main-content">
          <div className="page-header">
            <h2>Bem-vindo ao Sistema ConfiSafe</h2>
            <p>Monitore a segurança e conformidade com EPIs em tempo real através das câmeras de IA.</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card ${stat.className}`}>
                <div className="stat-icon-wrapper">{stat.icon}</div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Câmeras Section - Monitoramento IA */}
          <section className="section cameras-section">
            <div className="section-header-flex">
              <h3 className="section-title">Monitoramento por Visão Computacional</h3>
              <button className="btn-add-sector" onClick={() => setShowAddModal(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar Setor
              </button>
            </div>

            <div className="cameras-grid-inicial">
              {cameras.map((camera) => (
                <div 
                  key={camera.id} 
                  className={`camera-card-inicial camera-${camera.status}`}
                >
                  <div className="camera-video-inicial">
                    {camera.url ? (
                      <img src={camera.url} alt={camera.nome} className="camera-feed" />
                    ) : (
                      <div className="camera-placeholder-inicial">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polygon points="23 7 16 12 23 17 23 7"></polygon>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        <span className="camera-ai-badge">IA</span>
                      </div>
                    )}
                    <span className={`camera-status-indicator ${camera.status}`}>
                      {camera.status === 'ativo' ? '● AO VIVO' : '○ OFFLINE'}
                    </span>

                    {/* Botões de ação sobre o vídeo */}
                    <div className="camera-overlay-actions">
                      <button 
                        className="camera-action-btn fullscreen-btn"
                        onClick={() => openFullscreen(camera)}
                        title="Tela Cheia"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </button>
                      <button 
                        className={`camera-action-btn status-btn ${camera.status}`}
                        onClick={() => toggleCameraStatus(camera.id)}
                        title={camera.status === 'ativo' ? 'Desativar' : 'Ativar'}
                      >
                        {camera.status === 'ativo' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="camera-info-inicial">
                    <div className="camera-info-header">
                      <h4>{camera.nome}</h4>
                      <div className="camera-actions-menu">
                        <button 
                          className="camera-menu-btn"
                          onClick={() => handleEditCamera(camera)}
                          title="Editar"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          className="camera-menu-btn delete-btn"
                          onClick={() => handleRemoveCamera(camera.id)}
                          title="Remover"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="camera-stats">
                      <span className="camera-stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                        {camera.pessoas} {camera.pessoas === 1 ? 'pessoa' : 'pessoas'}
                      </span>
                      <span className={`camera-conformity ${camera.pessoas > 0 ? 'active' : ''}`}>
                        {camera.pessoas > 0 ? 'Monitorando' : 'Sem movimento'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Card para adicionar novo setor */}
              <div className="camera-card-inicial camera-add-card" onClick={() => setShowAddModal(true)}>
                <div className="camera-add-content">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <span>Adicionar Novo Setor</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="section">
            <h3 className="section-title">Ações Rápidas</h3>
            <div className="actions-grid">
              <a href="/relatorio" className="action-card" data-action="reports">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                <h4>Relatórios</h4>
                <p>Visualizar estatísticas</p>
              </a>

              <a href="/treinamento" className="action-card" data-action="trainings">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <h4>Treinamentos</h4>
                <p>Gerenciar capacitações</p>
              </a>

              <a href="/epis" className="action-card" data-action="monitoring">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <h4>Monitoramento</h4>
                <p>Detalhes por funcionário</p>
              </a>

              <a href="/gestao-epis" className="action-card" data-action="epis">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <h4>Gestão de EPIs</h4>
                <p>Empréstimos e devoluções</p>
              </a>
            </div>
          </section>

          {/* Alerts */}
          <section className="section">
            <h3 className="section-title">Alertas Recentes</h3>
            <div className="alerts-list" id="alertsList">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert alert--${alert.type}`} data-alert-id={alert.id}>
                  <div className="alert-icon-wrapper">{alert.icon}</div>
                  <div className="alert-content">
                    <strong>{alert.title}</strong>
                    <p>{alert.desc}</p>
                  </div>
                  <time>{alert.time}</time>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />

      {/* Modal Adicionar Setor */}
      {showAddModal && (
        <div className="modal-overlay-inicial" onClick={() => setShowAddModal(false)}>
          <div className="modal-content-inicial" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-inicial">
              <h2>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                Adicionar Novo Setor
              </h2>
              <button className="modal-close-inicial" onClick={() => setShowAddModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body-inicial">
              <div className="form-group-inicial">
                <label>Nome do Setor *</label>
                <input
                  type="text"
                  placeholder="Ex: Setor C - Embalagem"
                  value={newSector.nome}
                  onChange={(e) => setNewSector({ ...newSector, nome: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="form-group-inicial">
                <label>URL da Câmera (opcional)</label>
                <input
                  type="text"
                  placeholder="rtsp://camera-ip/stream ou http://..."
                  value={newSector.url}
                  onChange={(e) => setNewSector({ ...newSector, url: e.target.value })}
                />
                <span className="form-hint">Deixe vazio para usar placeholder da IA</span>
              </div>
            </div>
            <div className="modal-footer-inicial">
              <button className="btn-cancel-inicial" onClick={() => setShowAddModal(false)}>
                Cancelar
              </button>
              <button className="btn-confirm-inicial" onClick={handleAddSector}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Adicionar Setor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Setor */}
      {showEditModal && editingCamera && (
        <div className="modal-overlay-inicial" onClick={() => setShowEditModal(false)}>
          <div className="modal-content-inicial" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-inicial">
              <h2>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar Setor
              </h2>
              <button className="modal-close-inicial" onClick={() => setShowEditModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body-inicial">
              <div className="form-group-inicial">
                <label>Nome do Setor *</label>
                <input
                  type="text"
                  placeholder="Ex: Setor C - Embalagem"
                  value={editingCamera.nome}
                  onChange={(e) => setEditingCamera({ ...editingCamera, nome: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="form-group-inicial">
                <label>URL da Câmera (opcional)</label>
                <input
                  type="text"
                  placeholder="rtsp://camera-ip/stream ou http://..."
                  value={editingCamera.url}
                  onChange={(e) => setEditingCamera({ ...editingCamera, url: e.target.value })}
                />
                <span className="form-hint">Deixe vazio para usar placeholder da IA</span>
              </div>
              <div className="form-group-inicial">
                <label>Pessoas detectadas</label>
                <input
                  type="number"
                  min="0"
                  value={editingCamera.pessoas}
                  onChange={(e) => setEditingCamera({ ...editingCamera, pessoas: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="modal-footer-inicial">
              <button className="btn-cancel-inicial" onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
              <button className="btn-confirm-inicial" onClick={handleSaveEdit}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tela Cheia da Câmera */}
      {fullscreenCamera && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <div className="fullscreen-header">
              <div className="fullscreen-info">
                <span className={`fullscreen-status ${fullscreenCamera.status}`}>
                  {fullscreenCamera.status === 'ativo' ? '● AO VIVO' : '○ OFFLINE'}
                </span>
                <h2>{fullscreenCamera.nome}</h2>
              </div>
              <button className="fullscreen-close" onClick={closeFullscreen}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>ESC para sair</span>
              </button>
            </div>
            <div className="fullscreen-video">
              {fullscreenCamera.url ? (
                <img src={fullscreenCamera.url} alt={fullscreenCamera.nome} />
              ) : (
                <div className="fullscreen-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>Feed de IA em tempo real</span>
                  <span className="ai-processing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    Processando visão computacional...
                  </span>
                </div>
              )}
            </div>
            <div className="fullscreen-stats">
              <div className="fullscreen-stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                <span>{fullscreenCamera.pessoas} pessoas detectadas</span>
              </div>
              <div className="fullscreen-stat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Monitoramento ativo</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicial;
