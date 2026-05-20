import { aguardaPostLogin, validaPostLogin } from '../support/api/login.api'
import { test, expect } from '../support/fixtures/login.fixture'

test.describe('Login', () => {

  test('denied', async ({ loginPage }) => {
    await loginPage.login('email@dominio.com', 'senha')
    await expect(loginPage.toast).toContainText('Erro')
  })

  test('success', async ({ page, loginPage }) => {
    // Define o body esperado no retorno da API
    const expectedBody = {
      id: 25453,
      nome: 'aa',
    }

    // Registra a escuta da requisição POST /signin antes da ação — evita race condition
    const responsePromise = aguardaPostLogin(page)

    // Executa a ação que dispara a requisição — preenche e submete o formulário
    await loginPage.login('aa', 'aa')

    // Aguarda a resposta da requisição capturada pelo waitForResponse
    const response = await responsePromise

    // Valida o status code e o body do retorno da API
    await validaPostLogin(response, 200, expectedBody)
  })
})