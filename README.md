# Node Auth API

API REST de autenticação construída com Node.js e Clean Architecture, com suporte a registro, login e rotas protegidas via JWT.

[![CI](https://github.com/andersonkaiti/node-auth-api/actions/workflows/ci.yml/badge.svg)](https://github.com/andersonkaiti/node-auth-api/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

## Stack

| Categoria             | Tecnologia              | Versão |
|-----------------------|-------------------------|--------|
| Runtime               | Node.js                 | 22     |
| Linguagem             | TypeScript              | 6      |
| Framework HTTP        | Express                 | 5      |
| ORM                   | Prisma                  | 7      |
| Banco de dados        | PostgreSQL              | 16     |
| Autenticação          | jsonwebtoken + bcryptjs | 9 / 3  |
| Validação             | Zod                     | 4      |
| Testes                | Vitest + Supertest      | 4 / 7  |
| Formatação / Lint     | Biome                   | 2      |
| Gerenciador de pacotes| pnpm                    | latest |
| CI/CD                 | GitHub Actions          | —      |

## Arquitetura

O projeto segue os princípios da **Clean Architecture**, onde as dependências sempre apontam de fora para dentro — a camada de domínio não conhece nenhuma outra.

```mermaid
flowchart TB
  subgraph factories["🏭 Factories (DI)"]
  end

  subgraph infra["🔌 Infra"]
    direction LR
    express["Express"]
    controllers["Controllers"]
    middlewares["Middlewares"]
    prisma["Prisma / PostgreSQL"]
  end

  subgraph app["⚙️ Application"]
    direction LR
    usecases["Use Cases"]
    errors["Errors"]
  end

  subgraph domain["🧠 Domain"]
    direction LR
    entities["Entities"]
    repositories["Repository Interfaces"]
  end

  factories --> infra
  factories --> app
  infra --> app
  app --> domain
```

## Fluxo de Requisição

Exemplo do fluxo em uma rota protegida (`GET /leads`):

```mermaid
sequenceDiagram
  participant C as Client
  participant MW as AuthMiddleware
  participant CT as Controller
  participant UC as UseCase
  participant R as Repository
  participant DB as PostgreSQL

  C->>MW: GET /leads<br/>Authorization: Bearer {token}
  MW->>MW: jwt.verify(token)
  MW->>CT: next() + req.metadata.accountId
  CT->>UC: execute(accountId)
  UC->>R: findAll()
  R->>DB: SELECT * FROM account
  DB-->>R: rows
  R-->>UC: Account[]
  UC-->>CT: Account[]
  CT-->>C: 200 OK { data }
```

## Modelo de Dados

```mermaid
erDiagram
  Account {
    UUID   id       PK
    String name
    String email    UK
    String password
  }
```

## Endpoints

| Método | Rota       | Auth          | Descrição                              |
|--------|------------|---------------|----------------------------------------|
| POST   | `/sign-up` | —             | Cria uma nova conta                    |
| POST   | `/sign-in` | —             | Autentica e retorna um JWT             |
| GET    | `/leads`   | Bearer token  | Lista contas (rota protegida)          |

## Como executar

### Pré-requisitos

- Node.js 22+
- pnpm
- PostgreSQL 16+

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database
JWT_SECRET=sua-chave-secreta
PORT=3000
```

### Instalação

```bash
pnpm install
```

### Banco de dados

```bash
pnpm db:generate   # gera o client Prisma
pnpm db:migrate    # executa as migrations
```

### Desenvolvimento

```bash
pnpm dev
```

### Testes

```bash
pnpm test          # modo watch
pnpm coverage      # com relatório de cobertura
```
