import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderPublico from '../components/Layout/HeaderPublico';
import '../styles/servicos.css';

function Servicos() {
  const [activeTab, setActiveTab] = useState('todos');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const servicos = [
    {
      id: 1,
      categoria: 'monitoramento',
      icone: 'camera',
      titulo: 'Monitoramento Inteligente',
      subtitulo: 'Vigilância 24/7 com IA',
      descricao: 'Sistema de câmeras com inteligência artificial para detecção automática de uso incorreto de EPIs em tempo real.',
      recursos: [
        'Detecção automática de EPIs',
        'Alertas em tempo real',
        'Gravação contínua em nuvem',
        'Reconhecimento facial',
        'Análise de comportamento'
      ],
      destaque: true,
      preco: 'Sob consulta'
    },
    {
      id: 2,
      categoria: 'gestao',
      icone: 'clipboard',
      titulo: 'Gestão de EPIs',
      subtitulo: 'Controle total do inventário',
      descricao: 'Plataforma completa para gerenciamento de equipamentos de proteção, desde a aquisição até o descarte.',
      recursos: [
        'Controle de validade',
        'Gestão de estoque',
        'Histórico de entregas',
        'Rastreabilidade completa',
        'Alertas de reposição'
      ],
      destaque: false,
      preco: 'Sob consulta'
    },
    {
      id: 3,
      categoria: 'treinamento',
      icone: 'graduacao',
      titulo: 'Treinamentos Corporativos',
      subtitulo: 'Capacitação especializada',
      descricao: 'Programas de treinamento personalizados para sua equipe, com certificação e acompanhamento de desempenho.',
      recursos: [
        'Cursos online e presenciais',
        'Certificação digital',
        'Avaliações periódicas',
        'Conteúdo personalizado',
        'Relatórios de progresso'
      ],
      destaque: false,
      preco: 'Sob consulta'
    },
    {
      id: 4,
      categoria: 'consultoria',
      icone: 'grafico',
      titulo: 'Consultoria em Segurança',
      subtitulo: 'Expertise em NRs',
      descricao: 'Consultoria especializada em normas regulamentadoras e implementação de políticas de segurança do trabalho.',
      recursos: [
        'Diagnóstico completo',
        'Adequação às NRs',
        'Plano de ação personalizado',
        'Acompanhamento mensal',
        'Auditorias periódicas'
      ],
      destaque: false,
      preco: 'Sob consulta'
    },
    {
      id: 5,
      categoria: 'monitoramento',
      icone: 'dashboard',
      titulo: 'Dashboard Analítico',
      subtitulo: 'Dados em tempo real',
      descricao: 'Painel de controle completo com métricas, KPIs e relatórios gerenciais para tomada de decisão estratégica.',
      recursos: [
        'KPIs em tempo real',
        'Relatórios customizados',
        'Exportação de dados',
        'Integração com BI',
        'Alertas inteligentes'
      ],
      destaque: true,
      preco: 'Sob consulta'
    },
    {
      id: 6,
      categoria: 'gestao',
      icone: 'usuarios',
      titulo: 'Gestão de Funcionários',
      subtitulo: 'Controle de colaboradores',
      descricao: 'Sistema completo para gestão de funcionários, com controle de acesso, histórico de EPIs e certificações.',
      recursos: [
        'Cadastro completo',
        'Histórico individual',
        'Controle de certificações',
        'Gestão de acessos',
        'Integração com RH'
      ],
      destaque: false,
      preco: 'Sob consulta'
    }
  ];

  const categorias = [
    { id: 'todos', nome: 'Todos os Serviços', icone: 'grid' },
    { id: 'monitoramento', nome: 'Monitoramento', icone: 'camera' },
    { id: 'gestao', nome: 'Gestão', icone: 'clipboard' },
    { id: 'treinamento', nome: 'Treinamento', icone: 'graduacao' },
    { id: 'consultoria', nome: 'Consultoria', icone: 'grafico' }
  ];

  const faqs = [
    {
      pergunta: 'Como funciona a implementação do sistema?',
      resposta: 'Nossa equipe realiza um diagnóstico inicial da sua empresa, seguido pela instalação e configuração do sistema. O processo inclui treinamento completo da equipe e suporte durante o período de adaptação.'
    },
    {
      pergunta: 'O sistema atende às normas regulamentadoras?',
      resposta: 'Sim, nosso sistema foi desenvolvido em total conformidade com as NRs vigentes, especialmente NR-6 (EPIs), NR-12 (Máquinas e Equipamentos) e NR-35 (Trabalho em Altura).'
    },
    {
      pergunta: 'Qual o tempo médio de implementação?',
      resposta: 'O tempo varia de acordo com o porte da empresa. Em média, a implementação completa leva de 2 a 4 semanas, incluindo instalação de equipamentos, configuração e treinamento.'
    },
    {
      pergunta: 'Vocês oferecem suporte técnico?',
      resposta: 'Sim, oferecemos suporte técnico 24/7 via telefone, chat e e-mail. Também disponibilizamos atendimento presencial para casos que necessitem de intervenção física.'
    },
    {
      pergunta: 'É possível integrar com outros sistemas?',
      resposta: 'Nosso sistema possui API aberta e pode ser integrado com ERPs, sistemas de RH, controle de ponto e outras plataformas utilizadas pela sua empresa.'
    }
  ];

  const servicosFiltrados = activeTab === 'todos' 
    ? servicos 
    : servicos.filter(s => s.categoria === activeTab);

  const renderIcone = (tipo) => {
    switch(tipo) {
      case 'camera':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 7l-7 5 7 5V7z"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        );
      case 'clipboard':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            <path d="M9 14l2 2 4-4"/>
          </svg>
        );
      case 'graduacao':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
          </svg>
        );
      case 'grafico':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21H3V3"/>
            <path d="M21 9l-6 6-4-4-5 5"/>
          </svg>
        );
      case 'dashboard':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="9" rx="1"/>
            <rect x="14" y="3" width="7" height="5" rx="1"/>
            <rect x="14" y="12" width="7" height="9" rx="1"/>
            <rect x="3" y="16" width="7" height="5" rx="1"/>
          </svg>
        );
      case 'usuarios':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'grid':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="servicos-page">
      {/* Header */}
      <HeaderPublico />

      {/* Hero Section */}
      <section className="servicos-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>Soluções Empresariais</span>
          </div>
          <h1>Serviços de Segurança<br/>do Trabalho</h1>
          <p>Tecnologia avançada e expertise para proteger seus colaboradores e garantir conformidade com as normas regulamentadoras.</p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">500+</span>
              <span className="stat-label">Empresas Atendidas</span>
            </div>
            <div className="stat">
              <span className="stat-value">99.8%</span>
              <span className="stat-label">Satisfação</span>
            </div>
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Suporte</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="servicos-filtros">
        <div className="filtros-container">
          <div className="filtros-tabs">
            {categorias.map(cat => (
              <button
                key={cat.id}
                className={`filtro-tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span className="tab-icon">{renderIcone(cat.icone)}</span>
                <span className="tab-text">{cat.nome}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Serviços */}
      <section className="servicos-grid-section">
        <div className="grid-container">
          <div className="servicos-grid">
            {servicosFiltrados.map(servico => (
              <div key={servico.id} className={`servico-card ${servico.destaque ? 'destaque' : ''}`}>
                {servico.destaque && (
                  <div className="card-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Popular
                  </div>
                )}
                
                <div className="card-header">
                  <div className="card-icon">
                    {renderIcone(servico.icone)}
                  </div>
                  <div className="card-titles">
                    <h3>{servico.titulo}</h3>
                    <span className="card-subtitle">{servico.subtitulo}</span>
                  </div>
                </div>
                
                <p className="card-description">{servico.descricao}</p>
                
                <ul className="card-recursos">
                  {servico.recursos.map((recurso, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {recurso}
                    </li>
                  ))}
                </ul>
                
                <div className="card-footer">
                  <span className="card-preco">{servico.preco}</span>
                  <Link to="/contato" className="btn-card">
                    Solicitar Proposta
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que nos escolher */}
      <section className="servicos-diferenciais">
        <div className="diferenciais-container">
          <div className="section-header">
            <span className="section-tag">Nossos Diferenciais</span>
            <h2>Por que escolher a ConfiSafe?</h2>
            <p>Combinamos tecnologia de ponta com expertise em segurança do trabalho</p>
          </div>
          
          <div className="diferenciais-grid">
            <div className="diferencial-card">
              <div className="diferencial-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h4>Implementação Rápida</h4>
              <p>Sistema operacional em até 2 semanas com suporte dedicado durante todo o processo.</p>
            </div>
            
            <div className="diferencial-card">
              <div className="diferencial-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <h4>100% Conformidade</h4>
              <p>Atendimento completo às NRs e certificações de segurança do trabalho.</p>
            </div>
            
            <div className="diferencial-card">
              <div className="diferencial-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h4>Integração Total</h4>
              <p>API aberta para integração com ERP, RH e outros sistemas da sua empresa.</p>
            </div>
            
            <div className="diferencial-card">
              <div className="diferencial-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4>Resultados Comprovados</h4>
              <p>Redução média de 70% em acidentes de trabalho nas empresas atendidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="servicos-faq">
        <div className="faq-container">
          <div className="section-header">
            <span className="section-tag">Tire suas dúvidas</span>
            <h2>Perguntas Frequentes</h2>
            <p>Encontre respostas para as principais questões sobre nossos serviços</p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <h4>{faq.pergunta}</h4>
                  <span className="faq-toggle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{faq.resposta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="servicos-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Pronto para transformar a segurança da sua empresa?</h2>
            <p>Entre em contato conosco e solicite uma demonstração gratuita do sistema.</p>
            <div className="cta-buttons">
              <Link to="/contato" className="btn-cta-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Falar com Consultor
              </Link>
              <Link to="/cadastro" className="btn-cta-secondary">
                Criar Conta Gratuita
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="cta-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
            <div className="decoration-circle"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="servicos-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span><strong>Confi</strong>Safe</span>
            </div>
            <p>Protegendo vidas através da tecnologia. Soluções completas em segurança do trabalho para sua empresa.</p>
          </div>
          
          <div className="footer-links-section">
            <h5>Serviços</h5>
            <ul>
              <li><a href="#monitoramento">Monitoramento IA</a></li>
              <li><a href="#gestao">Gestão de EPIs</a></li>
              <li><a href="#treinamento">Treinamentos</a></li>
              <li><a href="#consultoria">Consultoria</a></li>
            </ul>
          </div>
          
          <div className="footer-links-section">
            <h5>Empresa</h5>
            <ul>
              <li><Link to="/inicial">Sobre Nós</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><a href="#carreiras">Carreiras</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-links-section">
            <h5>Legal</h5>
            <ul>
              <li><a href="#privacidade">Privacidade</a></li>
              <li><a href="#termos">Termos de Uso</a></li>
              <li><a href="#lgpd">LGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 ConfiSafe. Todos os direitos reservados.</p>
          <div className="footer-social">
            <a href="#linkedin" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Servicos;
