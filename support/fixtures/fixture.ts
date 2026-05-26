// Importa o test original do Playwright
// "as base" renomeia o test original porque cria um test customizado
// Também importa o expect
import { test as base, expect } from '@playwright/test'

// Importa os Page Objects
// Cada Page Object representa uma tela da aplicação
import { LoginPage } from '../pages/login.page'
import { HomePage } from '../pages/home.page'
import { RegistrarPage } from '../pages/registrar.page'
import { TaskBarPage } from '../pages/taskBar.page'
import { ContasPage } from '../pages/contas.page'


// Define a tipagem das fixtures customizadas
// Isso informa ao TypeScript quais objetos estarão disponíveis dentro dos testes
type Pages = {

    // Disponível como: async ({ loginPage })
    loginPage: LoginPage

    // Disponível como: async ({ homePage })
    homePage: HomePage

    // Disponível como: async ({ registrarPage })
    registrarPage: RegistrarPage

    // Disponível como: async ({ taskBarPage })
    taskBarPage: TaskBarPage

    // Disponível como: async ({ contasPage })
    contasPage: ContasPage
}

// Cria um test customizado
// O extend adiciona fixtures customizadas além das fixtures padrão do Playwright
//
// Fixtures padrão:
// - page
// - browser
// - context
//
// Fixtures customizadas:
// - loginPage
// - homePage
// - registrarPage

export const test = base.extend<Pages>({

    // Cria automaticamente uma instância da LoginPage antes do teste
    loginPage: async ({ page }, use) => {

        // Instancia o Page Object injetando o page do Playwright
        const loginPage = new LoginPage(page)

        // Navega para a página de login
        await loginPage.visitLoginPage()

        // Disponibiliza a fixture para o teste. Tudo após o use() seria teardown/finalização
        await use(loginPage)
    },

    // Cria automaticamente uma instância da HomePage antes do teste
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await use(homePage)
    },

    // Cria automaticamente uma instância da RegistrarPage antes do teste
    registrarPage: async ({ page }, use) => {
        const registrarPage = new RegistrarPage(page)
        await registrarPage.visitRegistrarPage()
        await use(registrarPage)
    },

    // Cria automaticamente uma instância da TaskBarPage antes do teste
    taskBarPage: async ({ page }, use) => {
        const taskBarPage = new TaskBarPage(page)
        await use(taskBarPage)
    },

     // Cria automaticamente uma instância da ContasPage antes do teste
    contasPage: async ({ page }, use) => {
        const contasPage = new ContasPage(page)
        await use(contasPage)
    }
})

// Re-exporta o expect, assim os testes importam tudo do mesmo lugar -> import { test, expect } from '../support/fixtures'
export { expect }