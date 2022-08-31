import { ApiInterface } from '../common/api'
import { ipcRenderer, contextBridge } from 'electron'

function traverse (target) {
	Object.keys(target).forEach(key => {
		switch (typeof target[key]) {
			case "object": return traverse(target[key])
			case "string": {
				if (target[key] === 'handler') {
					return target[key] = function (data) {
						return ipcRenderer.invoke(key, data)
					}
				}
			}
		}
	})
}

traverse(ApiInterface)

contextBridge.exposeInMainWorld('api', ApiInterface)
