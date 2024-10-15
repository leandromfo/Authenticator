import express, { Express, Request, Response } from "express"
import { Method, ServerModel } from "../../Domain/Models/server-model"
import ServerAdapterInterface from "../Interfaces/server-adapter-interface"
import { Server } from "http"

export default class ExpressAdapter implements ServerAdapterInterface {
	application: Express
	server!: Server

	constructor() {
		this.application = express()
	}

	close(): void {
		this.server.close()
	}

	listen(port: number): void {
		this.server = this.application.listen(port)
	}

	setRoutes(routes: ServerModel[]): void {
		routes.forEach(route => {
			switch (route.method) {
				case Method.all:
					this.application.all(route.name, this.create(route.func))
					break
				case Method.delete:
					this.application.delete(route.name, this.create(route.func))
					break
				case Method.get:
					this.application.get(route.name, this.create(route.func))
					break
				case Method.post:
					this.application.post(route.name, this.create(route.func))
					break
				case Method.patch:
					this.application.patch(route.name, this.create(route.func))
					break
			}
		})
	}

	private create(func: Function): any {
		return async function (req: Request, res: Response) {
			await func(req, res)
		}
	}
}
