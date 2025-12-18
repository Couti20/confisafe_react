## 📋 Sobre o Projeto

O **ConfiSafe** é uma solução completa e moderna para **gestão de segurança do trabalho**, focada especialmente em **espaços confinados** e conformidade com a **NR-33** (Norma Regulamentadora de Segurança e Saúde nos Trabalhos em Espaços Confinados).

### 🎯 Objetivo

Proporcionar às empresas uma ferramenta robusta e intuitiva para:

- **Gerenciar EPIs** (Equipamentos de Proteção Individual) de forma eficiente
- **Controlar funcionários** e suas certificações
- **Monitorar treinamentos** obrigatórios e vencimentos
- **Gerar relatórios** detalhados para auditorias
- **Garantir conformidade** com normas regulamentadoras

### 💡 Problema que Resolve

Muitas empresas enfrentam dificuldades em:
- Controlar vencimento de EPIs e certificações
- Rastrear distribuição de equipamentos
- Manter registros atualizados para fiscalizações
- Gerenciar treinamentos obrigatórios da equipe

O **ConfiSafe** centraliza todas essas informações em uma plataforma única, intuitiva e segura.

---

## ✨ Funcionalidades

### 🔐 Autenticação & Segurança
| Funcionalidade | Descrição |
|----------------|-----------|
| 🔑 Login Seguro | Autenticação JWT com tokens seguros |
| 📝 Cadastro Multi-step | Registro em 3 etapas (Empresa → Responsável → Acesso) |
| 🔒 Rotas Protegidas | PrivateRoute para áreas autenticadas |
|


### 👷 Gestão de Funcionários
| Funcionalidade | Descrição |
|----------------|-----------|
| ➕ Cadastro Completo | Nome, CPF, cargo, setor, contato |
| 📊 Dashboard | Visão geral de todos os colaboradores |
| 🔍 Busca Avançada | Filtros por nome, setor, status |
| ✏️ Edição | Atualização de dados em tempo real |
| 🗑️ Exclusão | Remoção com confirmação |
| 📈 Estatísticas | Cards com métricas importantes |

### 🦺 Gestão de EPIs
| Funcionalidade | Descrição |
|----------------|-----------|
| 📦 Controle de Estoque | Quantidade disponível, mínimo, alertas |
| 📅 Validade | Monitoramento de vencimentos |
| 🔄 Distribuição | Registro de entregas aos funcionários |
| ⚠️ Alertas | Notificações de estoque baixo |
| 📋 Categorização | Organização por tipo de EPI |
| 📊 Relatórios | Histórico de movimentações |

### 🎓 Treinamentos
| Funcionalidade | Descrição |
|----------------|-----------|
| 📚 Catálogo | Lista de treinamentos disponíveis |
| ✅ Conclusão | Registro de treinamentos realizados |
| 📅 Vencimentos | Controle de reciclagens obrigatórias |
| 👥 Participantes | Gestão de turmas |
| 📜 Certificados | Geração de comprovantes |

### 🚪 Controle de Acesso
| Funcionalidade | Descrição |
|----------------|-----------|
| 👤 Perfis | Administrador, Gestor, Operador |
| 🔐 Permissões | Controle granular de acesso |
| 📝 Logs | Registro de atividades |
| 🏢 Multi-empresa | Suporte a múltiplas unidades |

### 📊 Relatórios & Analytics
| Funcionalidade | Descrição |
|----------------|-----------|
| 📈 Dashboards | Gráficos e métricas em tempo real |
| 📋 Exportação | PDF, Excel, CSV |
| 🔍 Filtros | Por período, setor, funcionário |
| 📅 Agendamento | Relatórios automáticos |
| 📧 Envio | Distribuição por e-mail |

### ⚙️ Configurações
| Funcionalidade | Descrição |
|----------------|-----------|
| 🏢 Dados da Empresa | Atualização de informações |
| 🔔 Notificações | Preferências de alertas |
| 🎨 Personalização | Temas e aparência |
| 🔒 Segurança | Alteração de senha, 2FA |
| 💾 Backup | Exportação de dados |

---

## 🛠️ Tecnologias

### Frontend
```
├── React 18.2.0          # Biblioteca principal
├── React Router 6.20     # Roteamento SPA
├── React Hot Toast       # Notificações toast
├── CSS Modules           # Estilização modular
├── Axios                 # Cliente HTTP
└── Context API           # Gerenciamento de estado
```

### Backend
```
├── Java 17               # Linguagem principal
├── Spring Boot 3.2.0     # Framework backend
├── Spring Security       # Autenticação/Autorização
├── Spring Data JPA       # Persistência de dados
├── JWT (jjwt 0.12.3)     # Tokens de autenticação
├── Lombok                # Redução de boilerplate
└── Maven                 # Gerenciador de dependências
```

### Banco de Dados
```
├── MySQL 8.0+            # Banco relacional
├── Hibernate             # ORM
└── Flyway                # Migrations (futuro)
```

### DevOps & Tools
```
├── Git                   # Controle de versão
├── XAMPP                 # Ambiente local MySQL
├── VS Code               # IDE Frontend
├── IntelliJ IDEA         # IDE Backend
└── Postman               # Testes de API
```

---

## 📸 Screenshots

### 🔐 Tela de Login

![login_confi](https://github.com/user-attachments/assets/1f473ed1-6ab4-4c9c-9071-d9696fdf0f17)

### 📊 Dashboard Principal

![inicial_confi](https://github.com/user-attachments/assets/249b3e95-763a-43e5-a28e-98d0b1e696da)

📊 Dashboard 

![dasboar](https://github.com/user-attachments/assets/edacf824-a072-4e37-98f6-b8c7479e210d)

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18+ e npm
- **Java** 17+
- **MySQL** 8.0+ (XAMPP recomendado)
- **Maven** 3.8+
- **Git**

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/confisafe.git
cd confisafe
```

### 2️⃣ Configure o Banco de Dados

```sql
-- Crie o banco de dados
CREATE DATABASE confisafe_db;

-- O sistema criará as tabelas automaticamente (JPA/Hibernate)
```

### 3️⃣ Configure o Backend

```bash
cd backend

# Configure o application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/confisafe_db
# spring.datasource.username=root
# spring.datasource.password=

# Execute o backend
./mvnw spring-boot:run
```

### 4️⃣ Configure o Frontend

```bash
cd frontend_compl

# Instale as dependências
npm install

# Execute o frontend
npm start
```

### 5️⃣ Acesse a Aplicação

```
Frontend: http://localhost:3000
Backend:  http://localhost:8080
```

---

## 🔌 API Endpoints

### 🔐 Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/auth/login` | Realizar login |
| `POST` | `/api/auth/logout` | Encerrar sessão |
| `POST` | `/api/auth/refresh` | Renovar token |

### 🏢 Empresas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/empresas` | Cadastrar empresa |
| `GET` | `/api/empresas/{id}` | Buscar empresa |
| `PUT` | `/api/empresas/{id}` | Atualizar empresa |

### 👥 Funcionários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/funcionarios` | Listar todos |
| `GET` | `/api/funcionarios/{id}` | Buscar por ID |
| `POST` | `/api/funcionarios` | Cadastrar novo |
| `PUT` | `/api/funcionarios/{id}` | Atualizar |
| `DELETE` | `/api/funcionarios/{id}` | Excluir |

### 🦺 EPIs
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/epis` | Listar EPIs |
| `POST` | `/api/epis` | Cadastrar EPI |
| `PUT` | `/api/epis/{id}` | Atualizar EPI |
| `DELETE` | `/api/epis/{id}` | Excluir EPI |
| `POST` | `/api/epis/distribuir` | Distribuir EPI |



---

## 📁 Estrutura do Projeto

```
confisafe/
├── 📂 frontend_compl/
│   ├── 📂 public/
│   │   └── index.html
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   └── 📂 Layout/
│   │   │       ├── Footer.jsx
│   │   │       ├── Header.jsx
│   │   │       ├── HeaderAuth.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Cadastro.jsx
│   │   │   ├── Configuracoes.jsx
│   │   │   ├── Contato.jsx
│   │   │   ├── ControleAcesso.jsx
│   │   │   ├── EPIs.jsx
│   │   │   ├── Funcionarios.jsx
│   │   │   ├── GestaoEpis.jsx
│   │   │   ├── Inicial.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Relatorio.jsx
│   │   │   └── Treinamento.jsx
│   │   ├── 📂 services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── empresaService.js
│   │   ├── 📂 styles/
│   │   │   ├── base.css
│   │   │   ├── cadastro.css
│   │   │   ├── components.css
│   │   │   ├── footer.css
│   │   │   ├── header.css
│   │   │   ├── layout.css
│   │   │   ├── login.css
│   │   │   ├── sidebar.css
│   │   │   └── tokens.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
│
├── 📂 backend/
│   ├── 📂 src/main/java/com/confisafe/
│   │   ├── 📂 config/
│   │   │   ├── CorsConfig.java
│   │   │   └── SecurityConfig.java
│   │   ├── 📂 controller/
│   │   │   ├── AuthController.java
│   │   │   └── EmpresaController.java
│   │   ├── 📂 model/
│   │   │   └── Empresa.java
│   │   ├── 📂 repository/
│   │   │   └── EmpresaRepository.java
│   │   ├── 📂 security/
│   │   │   ├── JwtAuthFilter.java
│   │   │   └── JwtService.java
│   │   └── 📂 service/
│   │       └── EmpresaService.java
│   ├── 📂 src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── README.md
```

---

## 🎨 Design System

### Cores Principais
| Cor | Hex | Uso |
|-----|-----|-----|
| 🟢 Primary | `#16a34a` | Botões, links, ações principais |
| 🟢 Primary Dark | `#15803d` | Hover, headers |
| ⚫ Dark | `#1a1a2e` | Textos, sidebar |
| ⚪ Light | `#f8fafc` | Backgrounds |
| 🔴 Danger | `#ef4444` | Erros, alertas |
| 🟡 Warning | `#f59e0b` | Avisos |



---

## 🔒 Segurança

O ConfiSafe implementa múltiplas camadas de segurança:

- ✅ **Autenticação JWT** com tokens seguros
- ✅ **CORS configurado** para origens permitidas
- ✅ **Validação de dados** no frontend e backend
- ✅ **Proteção contra CSRF**
- ✅ **Rate limiting** em endpoints sensíveis
- ✅ **HTTPS** em produção
- ✅ **Conformidade LGPD**

---

## 📜 Conformidade NR-33

O sistema foi desenvolvido seguindo as diretrizes da **Norma Regulamentadora 33**:

| Requisito | Status |
|-----------|--------|
| Cadastro de trabalhadores autorizados | ✅ |
| Controle de treinamentos obrigatórios | ✅ |
| Registro de EPIs específicos | ✅ |
| Histórico de atividades | ✅ |
| Gestão de documentação | ✅ |
| Alertas de vencimento | ✅ |
| Relatórios para fiscalização | ✅ |

---

## 🗺️ Roadmap

### ✅ Versão  (Atual)
- [x] Sistema de autenticação completo
- [x] Gestão de funcionários
- [x] Controle de EPIs
- [x] Dashboard responsivo
- [x] Toast notifications
- [x] Rotas protegidas





### 📅 Futuras versões
- [ ] Integração com biometria
- [ ] Módulo de ASO (Atestado de Saúde Ocupacional)
- [ ] BI integrado
- [ ] API pública

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

### Padrões de Commit
```
feat: Nova funcionalidade
fix: Correção de bug
docs: Documentação
style: Formatação
refactor: Refatoração
test: Testes
chore: Manutenção
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Michael Coutinho**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://https://github.com/Couti20/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://https://www.linkedin.com/in/michael-coutinho-28516424a/)

---

## ⭐ Apoie o Projeto

Se este projeto te ajudou, deixe uma ⭐ no repositório!
