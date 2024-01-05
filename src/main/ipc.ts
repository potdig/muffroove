import { dialog, ipcMain } from 'electron'

function handleIpc() {
  ipcMain.handle('play', () => {
    console.log('Now Playing')
    return 'Now Playing'
  })

  ipcMain.handle('openFolder', () => {
    const dirPath = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
    console.log(dirPath)
    return dirPath
  })
}

export { handleIpc }

