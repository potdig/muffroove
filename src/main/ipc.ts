import { dialog, ipcMain } from 'electron'
import fs from 'fs'
import { sep } from 'path'

function handleIpc() {
  ipcMain.handle('play', () => {
    console.log('Now Playing')
    return 'Now Playing'
  })

  ipcMain.handle('openFolder', () => {
    const dirPath = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
    if (!dirPath) {
      return undefined
    }
    const files = fs.readdirSync(dirPath[0])
    const mp3s = files
    .filter(file => file.match(/^.+\.mp3$/))
    .map(file => [dirPath, file].join(sep))
    console.log(mp3s)
    return mp3s
  })
}

export { handleIpc }

