# 💜 Zato — Fintech de Finanças Pessoais

> "Controle seu dinheiro, conquiste seus objetivos."

A Zato é um projeto que uso para estudar e praticar todas as etapas do desenvolvimento de software. Conforme avanço no curso de Análise e Desenvolvimento de Sistemas da FIAP, aprendo cada técnica e framework nas aulas e aplico diretamente aqui.

O projeto em si é uma fintech: um assistente financeiro pessoal que ajuda o usuário a registrar transações, gerenciar contas bancárias, definir metas e controlar uma lista de desejos com base em horas de trabalho.

![Dashboard Zato](https://raw.githubusercontent.com/enzocarezzato/zato-fintech/main/preview.png)

---

## 🚀 Tecnologias

| Camada     | Tecnologia                                        |
|------------|---------------------------------------------------|
| Backend    | Java 21 · Spring Boot 3.3.5 · Maven               |
| Banco      | Oracle (instância da FIAP)                        |
| Frontend   | React · Vite · React Router *(em breve)*          |
| Testes     | Insomnia (API) · Cypress E2E *(em breve)*         |
| Estilo     | Tailwind CSS · Fonte Inter · Roxo `#534AB7`       |

---

## 📁 Estrutura do repositório

```
zato-fintech/
├── backend/                                  # API REST em Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/br/com/fiap/zato/
│   │       │   ├── controller/               # Endpoints REST
│   │       │   ├── model/                    # Entidades JPA
│   │       │   ├── repository/               # Interfaces JpaRepository
│   │       │   ├── service/                  # Regras de negócio
│   │       │   └── ZatoApplication.java
│   │       └── resources/
│   │           └── application.properties.example
│   └── pom.xml
├── docs/
│   ├── sql/
│   │   └── create-tables.sql                 # Script de criação das tabelas e sequences
│   └── testes-api-insomnia/
│       ├── insomnia-collection.yaml          # Collection para importar no Insomnia
│       └── *.png                             # Prints de cada teste
├── frontend/                                 # SPA em React (em breve)
├── index.html                                # Primeira versão do front (HTML + Tailwind)
├── estilo.css
├── preview.png
└── README.md
```

---

## 🗄️ Entidades

Criei 5 entidades no Oracle da FIAP pelo SQL Developer, seguindo o padrão do curso (uma sequence e uma tabela para cada entidade):

| Entidade       | Tabela Oracle       | Descrição                                          |
|----------------|---------------------|----------------------------------------------------|
| Usuario        | T_USUARIO           | Usuário da aplicação, base do login                |
| ContaBancaria  | T_CONTA_BANCARIA    | Contas do usuário (corrente, poupança etc.)        |
| Transacao      | T_TRANSACAO         | Receitas e despesas vinculadas a uma conta         |
| Meta           | T_META              | Objetivos financeiros com prazo e valor-alvo       |
| Desejo         | T_DESEJO            | Lista de desejos com cálculo em horas de trabalho  |

---

## ▶️ Como rodar o backend

### Pré-requisitos

- Java 21 (uso o Eclipse Temurin)
- IntelliJ IDEA (já vem com Maven embutido)
- Acesso à instância Oracle da FIAP

### 1. Clone o repositório

```bash
git clone https://github.com/enzocarezzato/zato-fintech.git
cd zato-fintech
```

### 2. Crie as tabelas no Oracle

Abra o arquivo `docs/sql/create-tables.sql` no SQL Developer, conectado na instância da FIAP, e execute como script (F5). Ele cria as 5 sequences e as 5 tabelas.

### 3. Configure a conexão com o banco

O arquivo com as credenciais não fica no repositório. Dentro de `backend/src/main/resources/`, faça uma cópia do `application.properties.example`, renomeie para `application.properties` e preencha com o seu RM e a sua senha:

```properties
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_RM
spring.datasource.password=SUA_SENHA
```

### 4. Execute

Abra a pasta `backend/` no IntelliJ como projeto Maven e clique em **Run** na classe `ZatoApplication`.

A API sobe em `http://localhost:8080`.

---

## 🔌 Endpoints da API

Cada entidade tem o CRUD completo:

| Método | Rota                  | Status de sucesso | Quando não encontra |
|--------|-----------------------|-------------------|---------------------|
| GET    | `/api/{recurso}`      | 200 OK            | —                   |
| GET    | `/api/{recurso}/{id}` | 200 OK            | 404 Not Found       |
| POST   | `/api/{recurso}`      | 201 Created       | —                   |
| PUT    | `/api/{recurso}/{id}` | 200 OK            | 404 Not Found       |
| DELETE | `/api/{recurso}/{id}` | 204 No Content    | 404 Not Found       |

Recursos: `usuarios`, `contas`, `transacoes`, `metas` e `desejos`. Abaixo está o body esperado no POST e no PUT de cada um.

### `/api/usuarios`

```json
{
  "nome": "Enzo Teste",
  "email": "enzo@zato.com",
  "senha": "123456",
  "dataCadastro": "2026-10-23"
}
```

### `/api/contas`

```json
{
  "nomeBanco": "Nubank",
  "tipoConta": "corrente",
  "saldo": 1500.00,
  "cor": "#534AB7",
  "usuario": { "id": 1 }
}
```

### `/api/transacoes`

O `tipo` aceita `RECEITA` ou `DESPESA`.

```json
{
  "descricao": "Salário",
  "valor": 3500.00,
  "tipo": "RECEITA",
  "dataTransacao": "2026-10-23",
  "categoria": "renda",
  "contaBancaria": { "id": 1 }
}
```

### `/api/metas`

```json
{
  "nome": "Viagem para Europa",
  "valorObjetivo": 15000.00,
  "valorAtual": 2000.00,
  "dataPrazo": "2027-06-01",
  "status": "em andamento",
  "usuario": { "id": 1 }
}
```

### `/api/desejos`

A `prioridade` aceita `ALTA`, `MEDIA` ou `BAIXA`.

```json
{
  "nomeProduto": "Headphone Sony WH-1000XM5",
  "valorEstimado": 1899.00,
  "link": "https://www.amazon.com.br/...",
  "prioridade": "ALTA",
  "usuario": { "id": 1 }
}
```

---

## 🧪 Testes de API (Insomnia)

Testei todos os endpoints no Insomnia, incluindo cenários negativos (id inexistente e dados inválidos). A collection está em `docs/testes-api-insomnia/insomnia-collection.yaml` e pode ser importada no Insomnia (**Import** > arquivo). Os prints de cada teste estão na mesma pasta.

| # | Teste | Esperado | Resultado |
|---|-------|----------|-----------|
| 01 | Criar usuário | 201 | ✅ 201 |
| 02 | Listar usuários | 200 | ✅ 200 |
| 03 | Buscar usuário por id | 200 | ✅ 200 |
| 04 | Buscar usuário inexistente | 404 | ✅ 404 |
| 05 | Criar conta | 201 | ✅ 201 |
| 06 | Listar contas | 200 | ✅ 200 |
| 07 | Buscar conta inexistente | 404 | ✅ 404 |
| 08 | Criar transação | 201 | ✅ 201 |
| 09 | Listar transações | 200 | ✅ 200 |
| 10 | Criar transação com tipo inválido | 400 | ❌ 500 |
| 11 | Criar meta | 201 | ✅ 201 |
| 12 | Listar metas | 200 | ✅ 200 |
| 13 | Criar desejo | 201 | ✅ 201 |
| 14 | Listar desejos | 200 | ✅ 200 |
| 15 | Criar desejo com prioridade inválida | 400 | ❌ 500 |
| 16 | Atualizar usuário | 200 | ✅ 200 |
| 17 | Atualizar usuário inexistente | 404 | ✅ 404 |
| 18 | Excluir desejo | 204 | ✅ 204 |
| 19 | Excluir desejo inexistente | 404 | ✅ 404 |
| 20 | Excluir usuário com dados vinculados | 409 | ❌ 500 |

**17 de 20 passaram.** Os 3 que falharam têm a mesma causa: quando o Oracle recusa um dado (pela regra `CHECK` ou pela chave estrangeira), a API devolve 500 em vez de avisar o que está errado. A correção está em andamento.

---

## ✅ Status do projeto

- [x] Protótipo no Figma (5 telas desktop)
- [x] Modelagem do banco de dados (5 entidades)
- [x] Tabelas e sequences criadas no Oracle da FIAP
- [x] Backend Spring Boot com CRUD completo (5 entidades)
- [x] Conexão com Oracle validada
- [x] Testes de API documentados (Insomnia)
- [ ] Tratar erros de validação (400 e 409 no lugar de 500)
- [ ] Frontend em React (Vite + React Router)
- [ ] Telas: Login, Dashboard, Transações, Contas, Metas, Lista de Desejos, Erro 404
- [ ] README final de entrega com usuário de teste

---

## 👤 Autor

**Enzo André Carezzato Brossi**
Estudante de Análise e Desenvolvimento de Sistemas — FIAP (2026)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enzo-brossi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/enzocarezzato)
