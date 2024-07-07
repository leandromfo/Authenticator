import { Method, ServerModel } from "../Domain/Models/server-model"
import ServerAdapterInterface from "../Infra/Adapters/Interfaces/server-adapter-interface"

export default class Server {
	serverAdapter: ServerAdapterInterface
	constructor(serverAdapter: ServerAdapterInterface) {
		this.serverAdapter = serverAdapter
	}

	init(port: number): void {
		const routes = this.getRoutes()
		this.serverAdapter.setRoutes(routes)
		this.serverAdapter.listen(port)
	}

	release(): void {
		this.serverAdapter.close()
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
