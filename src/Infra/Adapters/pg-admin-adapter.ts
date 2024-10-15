import { Client } from "pg"
import DatabaseAdapterInterface from "../Interfaces/database-adapter-interface"

export default class PgAdapter implements DatabaseAdapterInterface {
	client: Client

	constructor(databaseProperties: any) {
		this.client = new Client(databaseProperties)
	}

	async connect(): Promise<void> {
		await this.client.connect()
	}

	async query(query: string, parameters?: any[]): Promise<any> {
		return await this.client.query(query, parameters)
	}

	async end(): Promise<void> {
		await this.client.end()
	}
}
