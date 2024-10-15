import { logger } from "../config"
import { LogLevel } from "../Domain/Enums/log-level-enum"
import DatabaseAdapterInterface from "../Infra/Interfaces/database-adapter-interface"

export default class Database {
	databaseAdapter: DatabaseAdapterInterface

	constructor(databaseAdapter: DatabaseAdapterInterface) {
		this.databaseAdapter = databaseAdapter
	}

	async init(): Promise<void> {
		logger.log(LogLevel.info, "Conectando ao banco de dados...")
		await this.databaseAdapter.connect()
		logger.log(LogLevel.info, "Banco de dados conectado!")
	}

	async query(query: string, parameters?: any[]): Promise<any> {
		logger.log(
			LogLevel.debug,
			"Query: " + query + " | Parameters: ",
			parameters
		)
		const data = await this.databaseAdapter.query(query, parameters)
		return data.rows
	}

	async release(): Promise<void> {
		logger.log(LogLevel.info, "Finalizando conexão com banco de dados...")
		await this.databaseAdapter.end()
		logger.log(LogLevel.info, "Conexão com banco de dados finalizada!")
	}
}
