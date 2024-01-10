import { Music } from './music'

type CustomAPI = {
  loadFile: (path: string) => Promise<string>
  openFolder: () => Promise<Music[]>
  sendMusicInfo: (music: Music) => void
  saveVolume: (volume: number) => void
  loadVolume: () => Promise<number>
  savePlaylist: (playlist: Music[]) => void
  loadPlaylist: () => Promise<Music[]>
  saveWebsocketPort: (port: number) => void
  loadWebsocketPort: () => Promise<number>
  restartWebsocketServer: () => Promise<void>
  quit: () => void
}
