import { Locator, Page } from '@playwright/test'

export class ContasPage {
    readonly AccountNameInput: Locator
    readonly SaveButton: Locator

    constructor(private page: Page) {
        this.AccountNameInput = page.getByPlaceholder('Conta...')
        this.SaveButton = page.getByRole('button', { name: 'Salvar' })
    }
}