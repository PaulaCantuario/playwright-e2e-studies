import { aguardaPostLogin, validaPostLogin } from '../support/api/login.api'
import { test, expect } from '../support/fixtures/fixture'

test.describe('Login', () => {

  //Este teste além de cobrir a validação do retorno da API, também valida a mensagem de sucesso exibida no front-end, garantindo que ambos os aspectos do login sejam verificados.
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
    await expect(loginPage.toast).toContainText('Bem vindo')
  })

  // Este teste cobre a validação do retorno da API, garantindo que o status code e o body estejam corretos, além de validar a mensagem de erro exibida no front-end, garantindo que ambos os aspectos do login sejam verificados.
  test('denied - 400', async ({ page, loginPage }) => {
    const expectedBody = {
      error: 'Problemas com o login do usuário'
    }
    const responsePromise = aguardaPostLogin(page)
    await loginPage.login('email@dominio.com', 'senha')

    const response = await responsePromise
    await validaPostLogin(response, 400, expectedBody)
    //Expressão regular para validar a mensagem de erro, garantindo que o status code 400 seja mencionado na mensagem exibida no front-end, mesmo que a API não retorne um body específico para esse cenário.
    await expect(loginPage.toast).toContainText(/Erro.*status code 400/)
  })

  // Este teste não cobre a validação do retorno da API porque o cenário de erro é tratado apenas no front-end, sem uma resposta específica da API para validar.
  test('denied - 401', async ({ loginPage }) => {
    await loginPage.login('aa', 'senha')
    await expect(loginPage.toast).toContainText(/Erro.*status code 401/)
  })
})