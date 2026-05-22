# 🎭 Estudos de Playwright com TypeScript

Repositório de estudos práticos com [Playwright](https://playwright.dev/) e TypeScript, cobrindo testes E2E com foco em boas práticas de arquitetura, organização e manutenibilidade.

---

## 📋 Pré-requisitos

- Node.js
- npm

---

## 🚀 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/PaulaCantuario/playwright-e2e-studies.git
cd playwright-e2e-studies

# 2. Instale as dependências
npm install

# 3. Instale os browsers do Playwright
npx playwright install
```

---

## ▶️ Como rodar os testes (para mais detalhes consulte a documentação oficial do Playwright)

```bash
# Rodar todos os testes
npx playwright test

# Rodar em modo UI (debug visual)
npx playwright test --headed

# Rodar um arquivo específico
npx playwright test tests/nome-do-arquivo.spec.ts

```

## 🗂️ Estrutura de pastas

| Pasta | Responsabilidade |
|---|---|
| `tests/` | Cenários de teste E2E |
| `support/pages/` | Page Objects - encapsulam interações e seletores por página |
| `support/api/` | Chamadas de API e assertions de contrato/resposta |
| `support/utils/faker.ts` | Data Builders com Faker - geração de massa de dados dinâmica |
| `support/fixtures/` | Ponto único de exportação das pages, facilitando import nos testes. Atualmente estou usando apenas um arquivo. Caso o projeto cresça, será necessário separar os arquivos de fixtures, mas isso requer mais conhecimento em typescript e menos funções nativas do PW |

---

## 🧩 Padrões adotados

- **Page Object Model (POM):** cada página tem sua própria classe com os métodos e seletores relacionados.
- **Fixtures customizadas:** as pages são injetadas via fixture, evitando instanciar manualmente em cada teste.
- **Dados dinâmicos com Faker:** dados de teste (nomes, e-mails, endereços etc.) são gerados via `@faker-js/faker`, evitando massa de dados estática e hardcoded.

---

## 📦 Dependências principais

| Pacote | Descrição |
|---|---|
| `@playwright/test` | Framework de testes E2E |
| `@faker-js/faker` | Geração de dados dinâmicos e aleatórios nos testes |

---

## 📄 Licença

Projeto de estudos - sem licença formal.