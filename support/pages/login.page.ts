import { Locator, Page } from '@playwright/test'

export class LoginPage {
    // Mapeamento dos elementos da página de login
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly toast: Locator

    constructor(private page: Page) {
        // Localiza o input de email pelo placeholder
        this.emailInput = page.getByPlaceholder('seu@email.com')
        
        // Localiza o input de senha pelo atributo data-test
        this.passwordInput = page.locator('[data-test="passwd"]')
        
        // Localiza o botão de login pelo role e nome acessível
        this.loginButton = page.getByRole('button', { name: 'Entrar' })
        
        // Localiza o toast de feedback ao usuário
        this.toast = page.locator('.toast-message')
    }

    // Navega para a página de login
    async visitLoginPage() {
        await this.page.goto('/')
    }

    // Preenche o formulário e submete — dispara a requisição POST /signin
    async login(email: string, password: string) {
        await this.visitLoginPage()
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}