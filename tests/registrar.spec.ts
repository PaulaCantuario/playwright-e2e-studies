import { test, expect } from '../support/fixtures/registrar.fixture'
import { aguardaPostRegistrar, validaPostRegistrar } from '../support/api/registrar.api'
import { fakeUser } from '../support/utils/faker'

test.describe('Registrar', () => {
  test('success', async ({ registrarPage }) => {
    const usuario = {
      name: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password
    }
    await registrarPage.register(usuario.name, usuario.email, usuario.password)
    await expect(registrarPage.toast).toContainText('Usuário adicionado com sucesso')
  })

  test('denied - 500', async ({ registrarPage }) => {
    const usuario = {
      name: 'Joana',
      email: 'joana@ana.com',
      password: fakeUser.password
    }
    await registrarPage.register(usuario.name, usuario.email, usuario.password)
    await expect(registrarPage.toast).toContainText('Erro')
  })

  //Mesmo teste anterior mas com validação do retorno da API
  test('denied - 500 - email already exists', async ({ page, registrarPage }) => {
    const usuario = {
      name: 'Joana',
      email: 'joana@ana.com',
      password: fakeUser.password
    }
    const expectedBody = {
      detail: 'Key (email)=(joana@ana.com) already exists.'
    }

    const responsePromise = aguardaPostRegistrar(page)    
    await registrarPage.register(usuario.name, usuario.email, usuario.password)
    
    const response = await responsePromise
    await validaPostRegistrar(response, 500, expectedBody)
    await expect(registrarPage.toast).toContainText('Erro')
  })
})