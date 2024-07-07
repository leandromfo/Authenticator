import { endAplication, startAplication } from "./config"

startAplication()

process.on("SIGINT" || "SIGTERM", async () => {
	await endAplication()
})
