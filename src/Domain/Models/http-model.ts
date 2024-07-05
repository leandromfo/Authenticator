export interface ServerModel {
	method: Method
	name: string
	func: Function
}

export enum Method {
	"all",
	"delete",
	"get",
	"patch",
	"post",
}
