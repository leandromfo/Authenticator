import DatabaseAdapterInterface from "../Infra/Adapters/Interfaces/database-adapter-interface"

export default class Database {
	databaseAdapter: DatabaseAdapterInterface

	constructor(databaseAdapter: DatabaseAdapterInterface) {
		this.databaseAdapter = databaseAdapter
	}

	async init(): Promise<void> {
		await this.databaseAdapter.connect()
	}

	async query(query: string, parameters?: any[]): Promise<any> {
		const data = await this.databaseAdapter.query(query, parameters)
		return data.rows
	}

	async release(): Promise<void> {
		await this.databaseAdapter.end()
	}
}
