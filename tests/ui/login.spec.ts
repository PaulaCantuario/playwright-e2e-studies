import { test, expect } from '../../support/fixtures/fixture'

test.describe('Login', () => {
  test('success', async ({ loginPage }) => {
    await loginPage.login('aa', 'aa')
    await expect(loginPage.toast).toContainText('Bem vindo')
  })

  test('denied - 400', async ({ page, loginPage }) => {
    await loginPage.login('email@dominio.com', 'senha')
    await expect(loginPage.toast).toContainText(/Erro.*status code 400/)
  })

  test('denied - 401', async ({ loginPage }) => {
    await loginPage.login('aa', 'senha')
    await expect(loginPage.toast).toContainText(/Erro.*status code 401/)
  })
})