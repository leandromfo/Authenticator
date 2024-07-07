import Database from "./App/database"
import Server from "./App/server"
import ExpressAdapter from "./Infra/Adapters/express-adapter"
import PgAdapter from "./Infra/Adapters/pg-admin-adapter"

const serverAdapterInterface = new ExpressAdapter()
const server = new Server(serverAdapterInterface)

const databaseProperties = {
	user: process.env.DB_USER || "",
	password: process.env.DB_PASS || "",
	host: process.env.DB_HOST || "",
	port: process.env.DB_PORT || "",
	database: process.env.DB_NAME || "",
}
const databaseAdapter = new PgAdapter(databaseProperties)
export const database = new Database(databaseAdapter)

export async function startApplication(): Promise<void> {
	const port = Number.parseInt(process.env.PORT as string) | 3000

	server.init(port)
	await database.init()
}

export async function endApplication(): Promise<void> {
	server.release()
	await database.release()
}
