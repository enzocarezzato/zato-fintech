# 💜 Zato — Fintech de Finanças Pessoais

> "Controle seu dinheiro, conquiste seus objetivos."

O **Zato** é uma fintech de finanças pessoais desenvolvida como projeto individual de portfólio no curso de Análise e Desenvolvimento de Sistemas da FIAP.

A proposta é simples: ajudar o usuário a registrar transações, gerenciar contas bancárias, definir metas financeiras e controlar uma lista de desejos com base em horas de trabalho.

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
├── backend/                          # API REST em Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/br/com/fiap/zato/
│   │       │   ├── controller/       # Endpoints REST
│   │       │   ├── model/            # Entidades JPA
│   │       │   ├── repository/       # Interfaces JpaRepository
│   │       │   ├── service/          # Regras de negócio
│   │       │   └── ZatoApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── docs/                             # Documentação e evidências
│   └── insomnia-collection.json      # Coleção de testes da API *(em breve)*
├── frontend/                         # SPA em React *(em breve)*
├── preview.png
└── README.md
```

---

## 🗄️ Entidades

O banco possui 5 entidades criadas no Oracle da FIAP via SQL Developer, seguindo o padrão do Cap 2 do curso (sequence + table por entidade):

| Entidade       | Tabela Oracle       | Descrição                                          |
|----------------|---------------------|----------------------------------------------------|
| Usuario        | T_USUARIO           | Usuário da aplicação, base do login                |
| ContaBancaria  | T_CONTA_BANCARIA    | Contas do usuário (corrente, poupança etc.)        |
| Transacao      | T_TRANSACAO         | Entradas e saídas vinculadas a uma conta           |
| Meta           | T_META              | Objetivos financeiros com prazo e valor-alvo       |
| Desejo         | T_DESEJO            | Lista de espera com cálculo em horas de trabalho   |

---

## ▶️ Como rodar o backend

### Pré-requisitos

- Java 21 (Eclipse Temurin recomendado)
- Maven (embutido no IntelliJ ou instalado separadamente)
- Acesso à instância Oracle da FIAP

### 1. Clone o repositório

```bash
git clone https://github.com/enzocarezzato/zato-fintech.git
cd zato-fintech
```

### 2. Configure o banco de dados

Abra `backend/src/main/resources/application.properties` e preencha suas credenciais:

```properties
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=SEU_RM
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
```

> As tabelas e sequences precisam estar criadas no Oracle antes de rodar. Os scripts serão adicionados em `docs/sql/` em breve.

### 3. Execute

**Pelo IntelliJ:** abra a pasta `backend/` como projeto Maven e clique em **Run** na classe `ZatoApplication`.

**Pela linha de comando:**

```bash
cd backend
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`.

---

## 🔌 Endpoints da API

Todos os endpoints seguem o padrão REST com os status HTTP corretos: `200 OK`, `201 Created`, `204 No Content` e `404 Not Found`.

### `/api/usuarios`

```json
// POST e PUT — body esperado
{
  "nome": "Enzo Teste",
  "email": "enzo@zato.com",
  "senha": "123456",
  "dataCadastro": "2026-10-23"
}
```

### `/api/contas`

```json
// POST e PUT — body esperado
{
  "nomeBanco": "Nubank",
  "tipoConta": "corrente",
  "saldo": 1500.00,
  "cor": "#534AB7",
  "usuario": { "id": 1 }
}
```

### `/api/transacoes`

```json
// POST e PUT — body esperado
{
  "descricao": "Salário",
  "valor": 3500.00,
  "tipo": "entrada",
  "dataTransacao": "2026-10-23",
  "categoria": "renda",
  "contaBancaria": { "id": 1 }
}
```

### `/api/metas`

```json
// POST e PUT — body esperado
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

```json
// POST e PUT — body esperado
{
  "nomeProduto": "Headphone Sony WH-1000XM5",
  "valorEstimado": 1899.00,
  "link": "https://www.amazon.com.br/...",
  "prioridade": "alta",
  "usuario": { "id": 1 }
}
```

> A coleção completa com todos os endpoints para importar no Insomnia será adicionada em `docs/insomnia-collection.json` após os testes.

---

## ✅ Status do projeto

- [x] Protótipo no Figma (5 telas desktop)
- [x] Modelagem do banco de dados (5 entidades)
- [x] Tabelas e sequences criadas no Oracle da FIAP
- [x] Backend Spring Boot com CRUD completo (5 entidades)
- [x] Conexão com Oracle validada
- [ ] Testes de API documentados (Insomnia)
- [ ] Frontend em React (Vite + React Router)
- [ ] Telas: Login, Dashboard, Transações, Contas, Metas, Lista de Espera, Erro 404
- [ ] README final de entrega com usuário de teste

---

## 👤 Autor

**Enzo André Carezzato Brossi**
Estudante de Análise e Desenvolvimento de Sistemas — FIAP (2026)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enzo-brossi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/enzocarezzato)
