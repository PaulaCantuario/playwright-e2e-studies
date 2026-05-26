import { Page, expect, Response } from '@playwright/test'
import { APIRequestContext } from '@playwright/test'

const API_URL = 'https://barrigarest.wcaquino.me'
const API_TOKEN = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjU0NTN9.QErFoB_dIIqMjjoHGVa6mN1v-Hp8zCrlXaWWNytem-k'

// Aguarda a resposta da API GET
export function aguardaGetConta(page: Page) {
    return page.waitForResponse(
        (response) =>
            response.url() === `${API_URL}/contas` &&
            response.request().method() === 'GET'
    )
}

// Valida response e retorna o body para validação no teste
export async function listaGetConta(
    response: Response,
    expectedStatusCode: number
) {
    expect(response.status()).toBe(expectedStatusCode)
    const responseBody = await response.json()
    return responseBody
}

// Envia requisição para API DELETE e valida o status code
export async function deleteConta(
    request: APIRequestContext,
    id: string,
    codeStatus: number
) {
    const response = await request.delete(`${API_URL}/contas/${id}`,
        {
            headers: {
                Authorization: `${API_TOKEN}`
            }
        })
    expect(response.status()).toBe(codeStatus)
}

// Aguarda a resposta da API POST
export async function aguardaPostConta(page: Page) {
    const response = await page.waitForResponse(
        response =>
            response.url() === `${API_URL}/contas` &&
            response.request().method() === 'POST'
    )
    const responseBody = await response.json()
    return responseBody.id
}

//Envia uma requisição POST para criar uma conta, valida o status code e retorna o id da conta criada para uso no teste
export async function criaPostConta(request: APIRequestContext, contaBody: any, codeStatus: number) {
    const response = await request.post(`${API_URL}/contas`, {
        headers: {
            Authorization: `${API_TOKEN}`
        },
        data: contaBody
    })
    expect(response.status()).toBe(codeStatus)
    const responseBody = await response.json()
    return responseBody.id
}
