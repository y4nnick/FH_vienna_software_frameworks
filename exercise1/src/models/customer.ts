export type IBAN = string

export interface Customer {
	id: number,
	name: string,
	address: string,
	iban: IBAN,
}