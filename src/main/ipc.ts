import { createHash } from 'crypto'
import { app, dialog, ipcMain } from 'electron'
import { readFileSync, readdirSync } from 'fs'
import { parseFile } from 'music-metadata'
import { sep } from 'path'
import { Music } from '../types/music'
import {
  loadPlaylist,
  loadVolume,
  loadWebsocketPort,
  savePlaylist,
  saveVolume,
  saveWebsocketPort
} from './config'
import { restartWebsocketServer, sendMusicInfo, setCurrentMusic } from './websocket'

function handleIpc(): void {
  ipcMain.handle('loadFile', (_, path) => {
    console.log(`Loading: ${path}`)
    const base64 = readFileSync(path, { encoding: 'base64' })
    return `data:audio/mpeg;base64,${base64}`
  })

  ipcMain.handle('sendMusicInfo', (_, music) => {
    setCurrentMusic(music)
    sendMusicInfo()
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
          return { path, title, artist, hash: createHash('md5').update(path).digest('hex') }
        })
    )
    console.log(mp3s)
    return mp3s
  })

  ipcMain.handle('quit', () => {
    app.quit()
  })

  ipcMain.handle('saveVolume', (_, volume) => {
    saveVolume(volume)
  })

  ipcMain.handle('loadVolume', (): number => {
    return loadVolume()
  })

  ipcMain.handle('savePlaylist', (_, playlist) => {
    savePlaylist(playlist)
  })

  ipcMain.handle('loadPlaylist', (): Music[] => {
    return loadPlaylist()
  })

  ipcMain.handle('saveWebsocketPort', (_, port) => {
    saveWebsocketPort(port)
  })

  ipcMain.handle('loadWebsocketPort', (): number => {
    return loadWebsocketPort()
  })

  ipcMain.handle('restartWebsocketServer', () => {
    const buttonIndex = dialog.showMessageBoxSync({
      message: 'Websocket server restarts. Are you sure?',
      buttons: ['YES', 'NO'],
      defaultId: 1
    })
    if (buttonIndex === 0) {
      restartWebsocketServer()
    }
  })
}

export { handleIpc }
