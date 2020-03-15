import { Customer } from './customer'
import { Transaction } from './transaction'

export interface Report {
	customer: Customer
	transactions: Array<Transaction>
}