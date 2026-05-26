import { test, expect } from '../support/fixtures/fixture'
import { aguardaGetSaldo, listaGetSaldo } from '../support/api/saldo.api'
import { formatCurrency } from '../support/utils/formatters'

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

    test.only('account names and values in each row has the same value returned by the API', async ({ page, loginPage, homePage }) => {

        const responsePromise = aguardaGetSaldo(page)
        await loginPage.login('paula@pw.com', 'senha123')

        const response = await responsePromise
        const saldoBody = await listaGetSaldo(response, 200)

        for (let i = 0; i < saldoBody.length; i++) {
            await expect(homePage.getAccountName(i)).toHaveText(saldoBody[i].conta)
            await expect(homePage.getAccountValue(i)).toHaveText(formatCurrency(saldoBody[i].saldo))
        }
    })

    test('sum of account values is correct', async ({ page, loginPage, homePage }) => {

        const responsePromise = aguardaGetSaldo(page)
        await loginPage.login('paula@pw.com', 'senha123')

        const response = await responsePromise
        const saldoBody = await listaGetSaldo(response, 200)

        let sum = 0
        for (let i = 0; i < saldoBody.length; i++) {
            sum += Number(saldoBody[i].saldo)
        }
        await expect(homePage.getValueByLabel('Total')).toHaveText(formatCurrency(sum.toString()))
    })
})