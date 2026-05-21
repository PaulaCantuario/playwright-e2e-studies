import { test as base, expect } from '@playwright/test'
import { RegistrarPage } from '../pages/registrar.page'

// Tipagem das fixtures customizadas disponíveis nos testes
type Pages = {
  registrarPage: RegistrarPage
}

// Estende o test base do Playwright com as fixtures customizadas
export const test = base.extend<Pages>({
  registrarPage: async ({ page }, use) => {
    const registrarPage = new RegistrarPage(page)
    await registrarPage.visitRegistrarPage()
    await use(registrarPage)
  }
})

// Re-exporta o expect para ser importado junto com o test customizado
export { expect }