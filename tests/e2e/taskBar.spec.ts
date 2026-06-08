import { test, expect } from '../../support/fixtures/fixture'

test('TaskBar samples', { tag: '@smoke'} , async ({ loginPage, taskBarPage }) => {
    await loginPage.login('aa', 'aa')
    await taskBarPage.movimentacoesButton.click()
    await taskBarPage.extratoButton.click()
    await taskBarPage.configuracoesButton.click()
    await taskBarPage.homeButton.click()
    await taskBarPage.acessaMenuContas()
    await taskBarPage.resetContas()
    await taskBarPage.logout()
})