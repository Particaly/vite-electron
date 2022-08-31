import type { IpcRenderer } from 'electron'

export {}

declare global {
	interface Window {
		$invoke: IpcRenderer.invoke
		$send: IpcRenderer.send
		$sendSync: IpcRenderer.sendSync
		removeLoading: () => void
		api: any
	}
}
