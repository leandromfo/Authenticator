import express, { Express, Request, Response } from "express"
import { Method, ServerModel } from "../../Domain/Models/http-model"
import ServerAdapterInterface from "./Interfaces/server-adapter-interface"

export default class ExpressAdapter implements ServerAdapterInterface {
	server: Express

	constructor() {
		this.server = express()
	}

	private create(func: Function): any {
		return async function (req: Request, res: Response) {
			await func(req, res)
		}
	}

	setRoutes(routes: ServerModel[]): void {
		routes.forEach(route => {
			switch (route.method) {
				case Method.all:
					this.server.all(route.name, this.create(route.func))
					break
				case Method.delete:
					this.server.delete(route.name, this.create(route.func))
					break
				case Method.get:
					this.server.get(route.name, this.create(route.func))
					break
				case Method.post:
					this.server.post(route.name, this.create(route.func))
					break
				case Method.patch:
					this.server.patch(route.name, this.create(route.func))
					break
			}
		})
	}

	listen(port: number): void {
		this.server.listen(port)
	}
}
