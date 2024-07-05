import Server from "./App/http"
import ExpressAdapter from "./Infra/Adapters/express-adapter"

export default function startAplication(): void {
	const port = Number.parseInt(process.env.PORT as string) | 3000
	const serverAdapterInterface = new ExpressAdapter()
	const server = new Server(serverAdapterInterface)
	server.init(port)
}
