import { dialog, ipcMain } from 'electron'
import fs from 'fs'
import { parseFile } from 'music-metadata'
import { sep } from 'path'
import { Music } from '../types/music'

function handleIpc() {
  ipcMain.handle('loadFile', (_, path) => {
    console.log(`Now Playing: ${path}`)
    const base64 = fs.readFileSync(path, { encoding: 'base64' })
    return `data:audio/mpeg;base64,${base64}`
  })

  ipcMain.handle('openFolder', async (): Promise<Music[]> => {
    const dirPath = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
    if (!dirPath) {
      return []
    }
    console.log(dirPath)
    const files = fs.readdirSync(dirPath[0])
    const mp3s = await Promise.all(
      files
        .filter(file => file.match(/^.+\.mp3$/))
        .map(file => [dirPath, file].join(sep))
        .map(async path => {
          const metadata = await parseFile(path)
          const { title, artist } = metadata.common
          return { path, title, artist }
        })
    )
    console.log(mp3s)
    return mp3s
  })
}

export { handleIpc }
