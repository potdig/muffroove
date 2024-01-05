import { ipcMain } from 'electron'

function handleIpc() {
  ipcMain.handle('play', () => {
    console.log('Now Playing')
    return 'Now Playing'
  })
}

export { handleIpc }
