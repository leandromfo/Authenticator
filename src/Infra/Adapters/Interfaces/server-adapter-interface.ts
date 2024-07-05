import { ServerModel } from "../../../Domain/Models/http-model"

export default interface HttpAdapterInterface {
	listen(port: number): void
	setRoutes(routes: ServerModel[]): void
}
