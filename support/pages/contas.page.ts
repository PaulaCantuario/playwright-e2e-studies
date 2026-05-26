import { Locator, Page } from '@playwright/test'

export class ContasPage {
    readonly nomeDaContaInput: Locator
    readonly saveButton: Locator
    readonly toastMessageSuccess: Locator
    readonly toastMessageError: Locator
    readonly tableRows: Locator

    constructor(private page: Page) {
        this.nomeDaContaInput = page.getByPlaceholder('Conta...')
        this.saveButton = page.getByRole('button', { name: 'Salvar' })
        this.toastMessageSuccess = page.getByRole('alert').getByText('Conta inserida com sucesso!')
        this.toastMessageError = page.getByRole('alert').getByText(/Erro*/)
        this.tableRows = page.locator('table.table tbody tr')
    }

    getAccountRow(nomeDaConta: string) {
        return this.tableRows.filter({hasText: nomeDaConta})
    }
}