import { Music } from './music'

type CustomAPI = {
  loadFile: (path: string) => Promise<string>
  openFolder: () => Promise<Music[]>
  sendMusicInfo: (music: Music) => void
  saveVolume: (volume: number) => void
  loadVolume: () => Promise<number>
  quit: () => void
}
