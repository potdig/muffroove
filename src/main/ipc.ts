import { app, dialog, ipcMain } from 'electron'
import { readFileSync, readdirSync } from 'fs'
import { parseFile } from 'music-metadata'
import { sep } from 'path'
import { Music } from '../types/music'
import { sendMusicInfo } from './websocket'

function handleIpc(): void {
  ipcMain.handle('loadFile', (_, path) => {
    console.log(`Now Playing: ${path}`)
    const base64 = readFileSync(path, { encoding: 'base64' })
    return `data:audio/mpeg;base64,${base64}`
  })

  ipcMain.handle('sendMusicInfo', (_, music) => {
    sendMusicInfo(music)
  })

  ipcMain.handle('openFolder', async (): Promise<Music[]> => {
    const dirPath = dialog.showOpenDialogSync({
      properties: ['openDirectory']
    })
    if (!dirPath) {
      return []
    }
    console.log(dirPath)
    const files = readdirSync(dirPath[0])
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

  ipcMain.handle('quit', () => {
    app.quit()
  })
}

export { handleIpc }
