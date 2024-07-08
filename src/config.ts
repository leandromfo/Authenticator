import Database from "./App/database"
import Logger, { InitLogger } from "./App/logger"
import Server from "./App/server"
import { LogLevel } from "./Domain/Enums/log-level-enum"
import ExpressAdapter from "./Infra/Adapters/express-adapter"
import PgAdapter from "./Infra/Adapters/pg-admin-adapter"
import WinstonAdapter from "./Infra/Adapters/winston-adapter"

const loggerAdapter = new WinstonAdapter()
const logger = new Logger(loggerAdapter)

const databaseProperties = {
	user: process.env.DB_USER || "",
	password: process.env.DB_PASS || "",
	host: process.env.DB_HOST || "",
	port: process.env.DB_PORT || "",
	database: process.env.DB_NAME || "",
}
const databaseAdapter = new PgAdapter(databaseProperties)
export const database = new Database(databaseAdapter)

const serverAdapterInterface = new ExpressAdapter()
const server = new Server(serverAdapterInterface)

export async function startApplication(): Promise<void> {
	const enviroment = process.env.NODE_ENV || NodeEnv.dev

	const loggerConfig: InitLogger = {
		isProd: enviroment == NodeEnv.prod,
		timestampFormat:
			process.env.LOG_TIMESTAMP_FORMAT || "DD/MM/YYYY HH:mm:ss (UTC)",
		logFile: process.env.LOG_FILE || "./files/logs/info.log",
		logLevelProd: LogLevel.info,
		logLevelDev: LogLevel.debug,
	}
	logger.init(loggerConfig)

	await database.init()

	const port = Number.parseInt(process.env.PORT || "3000")
	server.init(port)
}

export async function endApplication(): Promise<void> {
	server.release()
	await database.release()
	logger.release()
}

enum NodeEnv {
	dev = "dev",
	prod = "prod",
}
