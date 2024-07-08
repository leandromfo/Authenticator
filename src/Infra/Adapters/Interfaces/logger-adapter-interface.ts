import { InitLogger } from "../../../App/logger"
import { LogLevel } from "../../../Domain/Enums/log-level-enum"

export default interface LoggerAdapterInterface {
	close(): void
	init(parameters: InitLogger): void
	log(logLevel: LogLevel, message: string): void
}
