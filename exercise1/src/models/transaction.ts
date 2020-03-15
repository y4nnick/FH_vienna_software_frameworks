import { IBAN } from './customer'

export interface Transaction {
	id: number,
	execution_date: Date,
	amount: number,
	description: string,
	creditor: IBAN,
	debtor: IBAN,
}