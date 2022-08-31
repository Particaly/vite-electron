import { join } from 'path'
import EventEmitter from 'events'
import { createWindow, loadUrl } from '../Manager/Window'
import { useIPCHandle } from '../Tools'

export class Core {
	static event = new EventEmitter()
	static isReady = false
	static ready = new Promise(resolve => {
		Core.event.on('ready', resolve)
	})
	static excludes = ['excludes', 'event', 'ready', 'prototype', 'name', 'length', 'constructor']
	constructor() {}
	static async whenAppReady() {
		return this.ready
	}
	static openMainWindow() {
		const win = createWindow({
			uuid: 'main-window',
			webPreferences: {
				preload: join(__dirname, '../preload/index.cjs'),
			},
		})
		return loadUrl(win, {
			page: 'index',
			params: {
				id: 666,
			},
		})
	}
	static isAppReady() {
		Core.isReady = !Core.isReady
		return Core.isReady
	}
}

useIPCHandle(Core, Core.excludes)
