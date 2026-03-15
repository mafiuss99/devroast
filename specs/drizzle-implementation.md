# Especificação de Banco de Dados - DevRoast

## Visão Geral

Este documento especifica a implementação do Drizzle ORM com PostgreSQL para o projeto DevRoast.

## Stack

- **ORM**: Drizzle ORM
- **Banco**: PostgreSQL (via Docker Compose)
- **Migrações**: Drizzle Kit
- **IA**: Sistema de roast via API externa (LLM)

## Premissas

- Sistema anónimo (sem autenticação)
- Roasts gerados por IA externa

---

## Tabelas

### 1. `code_submissions`

Armazena os códigos submetidos para análise.

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|------------|
| id | `uuid` | PK, DEFAULT gen_random_uuid() | ID único da submissão |
| code | `text` | NOT NULL | Código submetido |
| language | `programming_language` | NOT NULL | Linguagem do código |
| roast_mode | `boolean` | DEFAULT true | Modo roast ativo |
| score | `decimal(2,1)` | CHECK (score >= 0 AND score <= 10) | Nota atribuída (0-10) |
| ip_hash | `varchar(64)` | hash identificador anónimo | Identificador do submitente |
| created_at | `timestamp` | DEFAULT NOW() | Data de submissão |

### 2. `roasts`

Armazena as críticas/roasts gerados por IA para cada submissão.

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|------------|
| id | `uuid` | PK, DEFAULT gen_random_uuid() | ID único do roast |
| submission_id | `uuid` | FK → code_submissions(id) | Referência à submissão |
| content | `text` | NOT NULL | Crítica gerada (máx sarcasmo) |
| model | `varchar(50)` | NOT NULL | Modelo de IA utilizado |
| model_response_id | `varchar(100)` | nullable | ID da resposta no provedor de IA |
| is_sarcastic | `boolean` | DEFAULT true | Se modo sarcástico ativo |
| created_at | `timestamp` | DEFAULT NOW() | Data de criação |

### 3. `analysis_cards`

Armazena os cards de análise detalhada por problema encontrado no código.

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|------------|
| id | `uuid` | PK, DEFAULT gen_random_uuid() | ID único do card |
| roast_id | `uuid` | FK → roasts(id) | Referência ao roast |
| issue_title | `varchar(255)` | NOT NULL | Título do problema |
| issue_description | `text` | NOT NULL | Descrição do problema |
| severity | `issue_severity` | NOT NULL | Severidade (low/medium/high/critical) |
| suggested_fix | `text` | NOT NULL | Solução sugerida |
| line_start | `integer` | nullable | Linha inicial no código |
| line_end | `integer` | nullable | Linha final no código |
| created_at | `timestamp` | DEFAULT NOW() | Data de criação |

---

## Enums

### `issue_severity`

```sql
CREATE TYPE issue_severity AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);
```

### `programming_language`

```sql
CREATE TYPE programming_language AS ENUM (
  'javascript',
  'typescript',
  'python',
  'java',
  'go',
  'rust',
  'cpp',
  'csharp',
  'ruby',
  'php',
  'sql',
  'html',
  'css',
  'other'
);
```

## Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## To-Do para Implementação

### Fase 1: Setup Inicial
- [ ] Adicionar dependências (drizzle-orm, drizzle-kit, pg)
- [ ] Criar arquivo `docker-compose.yml` com PostgreSQL
- [ ] Configurar variáveis de ambiente (DATABASE_URL)
- [ ] Criar arquivo `drizzle.config.ts`

### Fase 2: Schema e Migrações
- [ ] Definir schemas em `src/db/schema/`
- [ ] Criar enum types no banco
- [ ] Gerar migrações com `drizzle-kit push`
- [ ] Verificar conexão com banco

### Fase 3: Queries e Utilitários
- [ ] Criar `src/db/index.ts` com conexão
- [ ] Criar helpers/queries em `src/db/queries/`
- [ ] Testar operações CRUD básicas

### Fase 4: Integração com App
- [ ] Atualizar componentes para usar dados do banco
- [ ] Implementar submeter código → salvar em `code_submissions`
- [ ] Implementar geração de roasts → salvar em `roasts`
- [ ] Implementar análise de código → salvar em `analysis_cards`
- [ ] Implementar leaderboard → query em `leaderboard_entries`

---

## Observações

1. O leaderboard pode ser populado dinamicamente via query em `code_submissions` ordenando por score ASC (menor = mais vergonhoso)
2. Considerar soft delete para submissions (flag `is_deleted`) em vez de deletar fisicamente
3. Adicionar índices em: `code_submissions(score)`, `code_submissions(ip_hash)`, `code_submissions(language)`, `roasts(submission_id)`, `analysis_cards(roast_id)`
4. Para identificador anónimo, usar hash de IP ou gerenciar via localStorage e armazenar o hash
5. Armazenar `model` e `model_response_id` para possível audit e custo tracking
6. Considerar tabela separada para `api_configs` se precisar de múltiplos provedores de IA

---

## To-Do para Implementação

### Fase 1: Setup Inicial
- [ ] Adicionar dependências (drizzle-orm, drizzle-kit, pg)
- [ ] Criar arquivo `docker-compose.yml` com PostgreSQL
- [ ] Configurar variáveis de ambiente (DATABASE_URL)
- [ ] Criar arquivo `drizzle.config.ts`

### Fase 2: Schema e Migrações
- [ ] Definir schemas em `src/db/schema/`
- [ ] Criar enum types no banco
- [ ] Gerar migrações com `drizzle-kit push`
- [ ] Verificar conexão com banco

### Fase 3: Queries e Utilitários
- [ ] Criar `src/db/index.ts` com conexão
- [ ] Criar helpers/queries em `src/db/queries/`
- [ ] Testar operações CRUD básicas

### Fase 4: Integração com App
- [ ] Atualizar componentes para usar dados do banco
- [ ] Implementar submissão de código → salvar em `code_submissions`
- [ ] Implementar integração com IA → salvar em `roasts`
- [ ] Implementar parsing de resposta IA → salvar em `analysis_cards`
- [ ] Implementar leaderboard (query dinâmica em `code_submissions`)
- [ ] Implementar sistema de rate limiting por IP hash
