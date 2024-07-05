import { Method, ServerModel } from "../Domain/Models/http-model"
import ServerAdapterInterface from "../Infra/Adapters/Interfaces/server-adapter-interface"

export default class Server {
	serverAdapterInterface: ServerAdapterInterface
	constructor(serverAdapterInterface: ServerAdapterInterface) {
		this.serverAdapterInterface = serverAdapterInterface
	}

	init(port: number) {
		const routes = this.getRoutes()
		this.serverAdapterInterface.setRoutes(routes)
		this.serverAdapterInterface.listen(port)
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
