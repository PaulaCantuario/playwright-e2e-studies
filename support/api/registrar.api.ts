import { Page, expect, Response } from '@playwright/test'

const API_URL = 'https://barrigarest.wcaquino.me'

// Registra a escuta da requisição POST /usuarios e retorna a Promise sem resolver
export function aguardaPostRegistrar(page: Page) {
    return page.waitForResponse(
        (response) =>
            // Filtra pela URL exata do endpoint
            response.url() === `${API_URL}/usuarios` &&
            // Filtra pelo método HTTP da requisição
            response.request().method() === 'POST'
    )
}

export async function validaPostRegistrar(
    response: Response,         // Resposta capturada pelo aguardaPostRegistrar
    expectedStatusCode: number, // Status code esperado
    expectedBody: Record<string, any> // Body esperado no retorno da API
) {
    // Valida o status code do retorno
    expect(response.status()).toBe(expectedStatusCode)
    
    // Deserializa o body do retorno — precisa de await pois é assíncrono
    const responseBody = await response.json()
    
    // Valida o body do retorno
    expect(responseBody).toMatchObject(expectedBody)
}