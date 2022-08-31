import { join } from 'path'
import { getEnv } from '../Tools'
import { BrowserWindow, app } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'

interface WindowOptions extends BrowserWindowConstructorOptions {
	uuid: string
}

const cache = new Map()

export function createWindow(options: WindowOptions): BrowserWindow {
	const win = new BrowserWindow(options)
	if (cache.has(options.uuid)) {
		console.warn('this window has already been created.')
	}
	cache.set(options.uuid, win)
	win.on('closed', () => cache.delete(options.uuid))
	return win
}

export function findWindowById(id: string): BrowserWindow {
	return cache.get(id)
}

interface UrlOptions {
	page: string
	hash?: boolean // 是否是 hash 路由，如果是，将会在url后添加 '/#/', 默认为 true
	params?: {
		[prop: string]: string | number
	}
}
export function loadUrl(win: BrowserWindow, opt: UrlOptions): BrowserWindow {
	opt.hash = opt.hash === undefined ? true : opt.hash
	let location
	if (app.isPackaged) {
		location = join(__dirname, `../../renderer/${opt.page}.html`)
	} else {
		const host = getEnv('VITE_DEV_SERVER_HOST')
		const port = getEnv('VITE_DEV_SERVER_PORT')
		const hash = opt.hash ? '/#' : ''
		location = `http://${host}:${port}${hash}/${opt.page}`
	}
	if (opt.params) {
		location += '?'
		Object.keys(opt.params).forEach(key => {
			location += `${key}=${(opt.params as object)[key]}`
		})
	}
	app.isPackaged ? win.loadFile(location) : win.loadURL(location)
	return win
}
