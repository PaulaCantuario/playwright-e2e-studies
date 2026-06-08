import { aguardaPostLogin, validaPostLogin, postLogin } from '../../support/api/login.api'
import { test, expect } from '../../support/fixtures/fixture'

test.describe('Login', () => {
  test('success', async ({ request  }) => {
    const expectedBody = {
      id: 25453,
      nome: 'aa',
      token: expect.any(String)
    }
    const response = await postLogin(request, 'aa', 'aa')
    // Valida o status code e o body do retorno da API
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    expect(responseBody).toMatchObject(expectedBody)
  })

  test('denied - 400', async ({ request, loginPage }) => {
    const expectedBody = {
      error: 'Problemas com o login do usuário'
    }
    const response = await postLogin(request, 'email@dominio.com', 'senha')
    expect(response.status()).toBe(400)
    const responseBody = await response.json()
    expect(responseBody).toMatchObject(expectedBody)
  })

  test('denied - 401', async ({ request }) => {
    const response = await postLogin(request, 'aa', 'senha_incorreta')
    expect(response.status()).toBe(401)
  })
})