import winston, { format, Logger, transport } from "winston"
import { InitLogger } from "../../App/logger"
import { LogLevel } from "../../Domain/Enums/log-level-enum"
import LoggerAdapterInterface from "../Interfaces/logger-adapter-interface"

export default class WinstonAdapter implements LoggerAdapterInterface {
	logger: Logger

	constructor() {
		const levels = this.getLevels()
		this.logger = winston.createLogger({ levels })
	}

	close(): void {
		this.logger.end()
	}

	init(parameters: InitLogger): void {
		let loggerConfig: transport
		const { combine, timestamp, printf } = format
		const myTimestamp = timestamp({ format: parameters.timestampFormat })
		if (parameters.isProd) {
			loggerConfig = new winston.transports.File({
				filename: parameters.logFile,
				level: parameters.logLevelProd,
				format: combine(myTimestamp, format.json()),
			})
		} else {
			loggerConfig = new winston.transports.Console({
				level: parameters.logLevelDev,
				format: combine(
					myTimestamp,
					printf(({ level, message, timestamp, additionalInfo }) => {
						const parametersString = additionalInfo
							? "\n" + JSON.stringify(additionalInfo, null, 2)
							: ""
						return `\n${timestamp} | ${level}: ${message}${parametersString}`
					})
				),
			})
		}
		this.logger.add(loggerConfig)
	}

	log(logLevel: LogLevel, message: string, parameters?: any): void {
		if (parameters != undefined)
			this.logger.log(logLevel, message, { additionalInfo: parameters })
		else this.logger.log(logLevel, message)
	}

	private getLevels(): Record<string, number> {
		return Object.keys(LogLevel).reduce((acc, key, index) => {
			acc[LogLevel[key as keyof typeof LogLevel]] = index
			return acc
		}, {} as Record<string, number>)
	}
}
