import { test, expect } from '../support/fixtures/fixture'
import { aguardaPostConta, criaPostConta, deleteConta } from '../support/api/contas.api'
import { faker } from '@faker-js/faker'

test.describe('Contas', () => {
    test('should be able to create an account', async ({ loginPage, taskBarPage, contasPage, page, request }) => {

        const idContaPromise = aguardaPostConta(page)
        const nomeDaConta = `Conta de Teste ${faker.lorem.words(3)}`

        await loginPage.login('aa', 'aa')
        await taskBarPage.acessaMenuContas()
        await contasPage.nomeDaContaInput.fill(nomeDaConta)
        await contasPage.saveButton.click()
        await expect(contasPage.toastMessageSuccess).toBeVisible()
        await expect(contasPage.getAccountRow(nomeDaConta)).toHaveCount(1)
        //TearDown
        const idConta = await idContaPromise
        await deleteConta(request, idConta, 204)
    })

    test('should not be able to create an duplicate account - name fixed', async ({ loginPage, taskBarPage, contasPage }) => {

        const nomeDaConta = 'Conta mesmo nome'

        await loginPage.login('aa', 'aa')
        await taskBarPage.acessaMenuContas()
        await contasPage.nomeDaContaInput.fill(nomeDaConta)
        await contasPage.saveButton.click()
        await expect(contasPage.toastMessageError).toBeVisible()
        await expect(contasPage.getAccountRow(nomeDaConta)).toHaveCount(1)
    })

    test.only('should not be able to create an duplicate account - using API to create data before manual input', async ({ loginPage, taskBarPage, contasPage, page, request }) => {
        
        const contaBody = { nome: `Conta de Teste ${faker.lorem.words(3)}` }
        //Aqui eu não vou precisar monitorar a resposta da requisição enviada pelo front, porque eu já vou criar a conta diretamente pela API, então já posso armazenar o id diretamente na variável para usar no TearDown
        const idConta = await criaPostConta(request, contaBody, 201)

        await loginPage.login('aa', 'aa')
        await taskBarPage.acessaMenuContas()
        await contasPage.nomeDaContaInput.fill(contaBody.nome)
        await contasPage.saveButton.click()
        await expect(contasPage.toastMessageError).toBeVisible()
        await expect(contasPage.getAccountRow(contaBody.nome)).toHaveCount(1)
        //TearDown
        await deleteConta(request, idConta, 204)
    })

    //test('should not be able to create an account with empty name', async ({ loginPage, taskBarPage, contasPage }) => {})
    //test('should be able to edit an account', async ({ loginPage, taskBarPage, contasPage }) => {})
    //test('should not be able to edit an account with a duplicate name', async ({ loginPage, taskBarPage, contasPage }) => {})
    //test('should not be able to edit an account with empty name', async ({ loginPage, taskBarPage, contasPage }) => {})
    //test('should be able to delete an account', async ({ loginPage, taskBarPage, contasPage }) => {})
})