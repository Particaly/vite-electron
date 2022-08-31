import { app, ipcMain } from 'electron'
import { getType } from './Functional'
import { resolve } from 'path'
import { writeFile } from 'fs/promises'

const api = {}

function useIPCHandle(object, excludes) {
	handle(object, excludes)
	overwriteApiRecord()
}

function handle (object, excludes, record=api) {
	Object.getOwnPropertyNames(object).forEach(key => {
		if (excludes.includes(key) || key.at(0) === '_') {
			return false
		}
		const target = object[key]
		switch (getType(target)) {
			case 'object':
				record[key] = {}
				return handle(target, excludes, record[key])
			case 'asyncfunction':
			case 'function':
				record[key] = 'handler'
				return ipcMain.handle(key, target)
		}
	})
}

function overwriteApiRecord () {
	if (!app.isPackaged) {
		console.log(__dirname);
		const file = resolve(__dirname, '../../packages/common/api.ts')
		const code = `export const ApiInterface = ${JSON.stringify(api)}`
		writeFile(file, code, 'utf-8')
	}
}

export { useIPCHandle, overwriteApiRecord }
