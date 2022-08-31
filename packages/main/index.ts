import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { app, BrowserWindow } from 'electron'
import { release } from 'os'
import { Core } from './Core'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
	app.quit()
}

app.whenReady()
	.then(() => {
		if (!app.isPackaged) {
			installExtension(VUEJS3_DEVTOOLS.id).catch(e => e)
		}
	})
	.then(() => {
		Core.event.emit('ready')
		const win = Core.openMainWindow()
		win.webContents.openDevTools()
	})

app.on('window-all-closed', () => {
	Core.event.emit('quit')
	if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {})

app.on('activate', () => {
	const allWindows = BrowserWindow.getAllWindows()
	if (allWindows.length) {
		allWindows[0].focus()
	} else {
	}
})
