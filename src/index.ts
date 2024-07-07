import { endApplication, startApplication } from "./config"

startApplication()

process.on("SIGINT" || "SIGTERM", async () => {
	await endApplication()
})
