import { Page, expect, Response } from '@playwright/test'

const API_URL = 'https://barrigarest.wcaquino.me'

// Aguarda a resposta da API GET
export function aguardaGetSaldo(page: Page) {
    return page.waitForResponse(
        (response) =>
            response.url() === `${API_URL}/saldo` &&
            response.request().method() === 'GET'
    )
}

// Valida response e retorna o body para validação no teste
export async function listaGetSaldo(
    response: Response,
    expectedStatusCode: number
) {
    expect(response.status()).toBe(expectedStatusCode)
    const responseBody = await response.json()
    return responseBody
}