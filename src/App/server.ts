import { logger } from "../config"
import { LogLevel } from "../Domain/Enums/log-level-enum"
import { Method, ServerModel } from "../Domain/Models/server-model"
import ServerAdapterInterface from "../Infra/Interfaces/server-adapter-interface"

export default class Server {
	serverAdapter: ServerAdapterInterface
	constructor(serverAdapter: ServerAdapterInterface) {
		this.serverAdapter = serverAdapter
	}

	init(port: number): void {
		logger.log(LogLevel.info, "Iniciando servidor HTTP...")
		const routes = this.getRoutes()
		this.serverAdapter.setRoutes(routes)
		this.serverAdapter.listen(port)
		logger.log(LogLevel.info, "Servidor HTTP iniciado!")
	}

	release(): void {
		logger.log(LogLevel.info, "Encerrando servidor HTTP...")
		this.serverAdapter.close()
		logger.log(LogLevel.info, "Servidor HTTP encerrado!")
	}

	private getRoutes(): ServerModel[] {
		return [
			{
				method: Method.all,
				name: "/",
				func: () => {},
			},
		]
	}
}
