import { test, expect } from '../support/fixtures/fixture'
import { aguardaGetSaldo, listaGetSaldo } from '../support/api/saldo.api'

test.describe('Home', () => {
    test('account table summary exists', async ({ loginPage, homePage }) => {
        await loginPage.login('paula@pw.com', 'senha123')
        await expect(homePage.tableSaldoSummary).toBeVisible()
    })

    test('account table summary has correct column title names', async ({ loginPage, homePage }) => {
        await loginPage.login('paula@pw.com', 'senha123')
        await expect(homePage.tableSaldoSummary).toBeVisible()
        await expect(homePage.tableHeaderConta).toHaveText('Conta')
        await expect(homePage.tableHeaderSaldo).toHaveText('Saldo')
    })

    test('account names and values in each row has the same value returned by the API', async ({ page, loginPage, homePage }) => {
        const responsePromise = aguardaGetSaldo(page)
        await loginPage.login('paula@pw.com', 'senha123')
        const response = await responsePromise
        //const accounts = await listaGetAccounts(response, 200)
        await listaGetSaldo(response, 200)
        // Aqui vou adicionar asserções para comparar os dados da API com os dados da interface do usuário
    })
})