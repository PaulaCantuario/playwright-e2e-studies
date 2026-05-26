import { Locator, Page } from '@playwright/test'

export class TaskBarPage {
    readonly homeButton: Locator
    readonly movimentacoesButton: Locator
    readonly extratoButton: Locator
    readonly configuracoesButton: Locator
    readonly contaButton: Locator
    readonly resetarButton: Locator
    readonly sairButton: Locator

    constructor(private page: Page) {
        this.homeButton = page.locator('[data-test="menu-home"]')
        this.movimentacoesButton = page.locator('[data-test="menu-movimentacao"]')
        this.extratoButton = page.locator('[data-test="menu-extrato"]')
        this.configuracoesButton = page.locator('[data-test="menu-settings"]')
        this.contaButton = page.getByRole('link', { name: 'Contas' })
        this.resetarButton = page.getByRole('link', { name: 'Resetar' })
        this.sairButton = page.getByRole('link', { name: 'Sair' })
    }

    // Clica nos itens do menu dropdown "Engrenagem/Configurações"
    async acessaMenuContas() {
        await this.configuracoesButton.click()
        await this.contaButton.click()
    }

    async resetContas() {
        await this.configuracoesButton.click()
        await this.resetarButton.click()
    }

    async logout() {
        await this.configuracoesButton.click()
        await this.sairButton.click()
    }
}