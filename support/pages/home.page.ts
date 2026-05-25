import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly tableSaldoSummary: Locator
    readonly tableHeaderConta: Locator
    readonly tableHeaderSaldo: Locator
    readonly tableRows: Locator

    constructor(private page: Page) {
        this.tableSaldoSummary = page.getByRole('table')
        this.tableHeaderConta = page.getByRole('columnheader', { name: 'Conta' })
        this.tableHeaderSaldo = page.getByRole('columnheader', { name: 'Saldo' })
        this.tableRows = page.locator('table.table.table-hover.table-bordered tbody tr')
    }

    getAccountName(index: number) {
        return this.tableRows.nth(index).locator('td:nth-child(1)')
    }

    getAccountValue(index: number) {
        return this.tableRows.nth(index).locator('td:nth-child(2)')
    }

    getValueByLabel(label: string) {
        return this.page
            .locator('tbody tr')
            .filter({
                hasText: label
            })
            .locator('td:nth-child(2)')
    }
}