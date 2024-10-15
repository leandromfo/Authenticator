import Database from "./App/database"
import Logger from "./App/logger"
import Server from "./App/server"
import { LogLevel } from "./Domain/Enums/log-level-enum"
import ExpressAdapter from "./Infra/Adapters/express-adapter"
import PgAdapter from "./Infra/Adapters/pg-admin-adapter"
import WinstonAdapter from "./Infra/Adapters/winston-adapter"

const loggerAdapter = new WinstonAdapter()
export const logger = new Logger(loggerAdapter)

const databaseAdapter = new PgAdapter({
	user: process.env.DB_USER || "",
	password: process.env.DB_PASS || "",
	host: process.env.DB_HOST || "",
	port: process.env.DB_PORT || "",
	database: process.env.DB_NAME || "",
})
export const database = new Database(databaseAdapter)

const serverAdapterInterface = new ExpressAdapter()
const server = new Server(serverAdapterInterface)

export async function startApplication(): Promise<void> {
	const enviroment = process.env.NODE_ENV || NodeEnv.dev
	logger.init({
		isProd: enviroment == NodeEnv.prod,
		timestampFormat:
			process.env.LOG_TIMESTAMP_FORMAT || "DD/MM/YYYY HH:mm:ss (UTC)",
		logFile: process.env.LOG_FILE || "./files/logs/info.log",
		logLevelProd: LogLevel.info,
		logLevelDev: LogLevel.debug,
	})
	logger.log(LogLevel.info, "Iniciando aplicação...")
	await database.init()
	server.init(Number.parseInt(process.env.PORT || "3000"))
	logger.log(LogLevel.info, "Aplicação completamente iniciada!")
}

export async function endApplication(): Promise<void> {
	logger.log(LogLevel.info, "Encerrando aplicação...")
	server.release()
	await database.release()
	logger.log(LogLevel.info, "Aplicação encerrada!")
	logger.release()
}

enum NodeEnv {
	dev = "dev",
	prod = "prod",
}
