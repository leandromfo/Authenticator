import { ServerModel } from "../../Domain/Models/server-model"

export default interface ServerAdapterInterface {
	close(): void
	listen(port: number): void
	setRoutes(routes: ServerModel[]): void
}
