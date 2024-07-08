import { LogLevel } from "../Domain/Enums/log-level-enum"
import LoggerAdapterInterface from "../Infra/Adapters/Interfaces/logger-adapter-interface"

export default class Logger {
	loggerAdapter: LoggerAdapterInterface
	constructor(loggerAdapter: LoggerAdapterInterface) {
		this.loggerAdapter = loggerAdapter
	}

	init(loggerConfig: InitLogger): void {
		this.loggerAdapter.init(loggerConfig)
	}

	log(logLevel: LogLevel, message: string) {
		this.loggerAdapter.log(logLevel, message)
	}

	release(): void {
		this.loggerAdapter.close()
	}
}

export interface InitLogger {
	isProd: boolean
	timestampFormat: string
	logFile: string
	logLevelProd: LogLevel
	logLevelDev: LogLevel
}
