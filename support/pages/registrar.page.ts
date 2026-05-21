import { Locator, Page } from "@playwright/test"

export class RegistrarPage {
    readonly registerLink: Locator
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly registerButton: Locator
    readonly toast: Locator

    constructor(private page: Page) {
        this.registerLink = page.getByRole('link', { name: 'Registrar' })
        this.nameInput = page.getByPlaceholder('Nome')
        this.emailInput = page.locator('input[type="email"]')
        this.passwordInput = page.getByPlaceholder('Senha')
        this.registerButton = page.getByRole('button', { name: 'Registrar' })
        this.toast = page.locator('.toast-message')
    }

    // Navega para a página de registro
    async visitRegistrarPage() {
        await this.page.goto('/')
        await this.registerLink.click()
    }

    // Preenche o formulário de registro e submete
    async register(name: string, email: string, password: string) {
        await this.visitRegistrarPage()
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.registerButton.click()
    }
}