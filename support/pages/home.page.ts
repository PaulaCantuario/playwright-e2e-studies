import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly tableSaldoSummary: Locator
    readonly tableHeaderConta: Locator
    readonly tableHeaderSaldo: Locator
    readonly tableAccountName: Locator
    readonly tableAccountValue: Locator
    readonly tableRowTotal: Locator
    readonly tableRowTotalValue: Locator

    constructor(private page: Page) {
        this.tableSaldoSummary = page.getByRole('table')
        this.tableHeaderConta = page.getByRole('columnheader', { name: 'Conta' })
        this.tableHeaderSaldo = page.getByRole('columnheader', { name: 'Saldo' })
        this.tableAccountName = page.getByRole('cell', { name: 'Conta' })
        this.tableAccountValue = page.getByRole('cell', { name: 'Valor' })
        this.tableRowTotal = page.getByRole('cell', { name: 'Total' })
        this.tableRowTotalValue = page.getByRole('cell', { name: 'R$ 1.000,00' })
    }
}