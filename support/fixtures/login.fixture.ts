import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

// Tipagem das fixtures customizadas disponíveis nos testes
type Pages = {
  loginPage: LoginPage
}

// Estende o test base do Playwright com as fixtures customizadas
export const test = base.extend<Pages>({

  // Fixture loginPage — instancia o Page Object e disponibiliza nos testes
  loginPage: async ({ page }, use) => {
    
    // Instancia o Page Object injetando o page do Playwright
    const loginPage = new LoginPage(page)

    // Navega para a página de login antes de cada teste
    await loginPage.visitLoginPage()

    // Disponibiliza o loginPage para o teste — tudo após o use() é teardown
    await use(loginPage)
  }
})

// Re-exporta o expect para ser importado junto com o test customizado
export { expect }