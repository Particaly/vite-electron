export function getEnv(key) {
	return process.env[key]
}

type Types =
	| 'object'
	| 'string'
	| 'array'
	| 'undefined'
	| 'null'
	| 'number'
	| 'function'
	| 'asyncfunction'
export function getType(target): Types {
	return Object.prototype.toString.call(target).slice(8, -1).toLowerCase() as Types
}
