# top-finance (NestJS HTTP service) - DDD + Knex + Tests

Serviço Financeiro implementado em NestJS com estrutura DDD e Knex para persistência.
Expondo endpoints HTTP para CRUD de lançamentos financeiros.

## Scripts
- `npm run start:dev` — start em modo dev (watch)
- `npm run migrate` — roda migrações (usa .env)
- `npm run seed` — roda seeds
- `npm test` — roda testes E2E (usa sqlite in-memory)
