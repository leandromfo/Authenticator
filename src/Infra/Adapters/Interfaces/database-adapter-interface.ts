export default interface DatabaseAdapterInterface {
	connect(): Promise<void>
	query(query: string, parameters?: any[]): Promise<any>
	end(): Promise<void>
}
