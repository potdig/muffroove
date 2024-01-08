import { Music } from './music'

type CustomAPI = {
  loadFile: (path: string) => Promise<string>
  openFolder: () => Promise<Music>
  sendMusicInfo: (music: Music) => void
}
