import { endApplication, startApplication } from "./config"

startApplication()

process.on("SIGINT", async () => {
	await endApplication()
})

process.on("SIGTERM", async () => {
	await endApplication()
})
