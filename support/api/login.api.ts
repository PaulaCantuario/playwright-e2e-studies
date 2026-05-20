import { Page, expect, Response } from '@playwright/test'

const API_URL = 'https://barrigarest.wcaquino.me'

// Registra a escuta da requisição POST /signin e retorna a Promise sem resolver
export function aguardaPostLogin(page: Page) {
    return page.waitForResponse(
        (response) =>
            // Filtra pela URL exata do endpoint
            response.url() === `${API_URL}/signin` &&
            // Filtra pelo método HTTP da requisição
            response.request().method() === 'POST'
    )
}

export async function validaPostLogin(
    response: Response,         // Resposta capturada pelo aguardaPostLogin
    expectedStatusCode: number, // Status code esperado
    expectedBody: Record<string, any> // Body esperado no retorno da API
) {
    // Valida o status code do retorno
    expect(response.status()).toBe(expectedStatusCode)
    
    // Deserializa o body do retorno — precisa de await pois é assíncrono
    const responseBody = await response.json()
    
    // Valida se o body contém os campos esperados — toMatchObject permite body parcial
    expect(responseBody).toMatchObject(expectedBody)
}