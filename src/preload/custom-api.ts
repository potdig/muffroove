import { ipcRenderer } from 'electron'
import { CustomAPI } from '../types/custom-api'

const customApi: CustomAPI = {
  loadFile: async path => await ipcRenderer.invoke('loadFile', path),
  openFolder: async () => await ipcRenderer.invoke('openFolder'),
  sendMusicInfo: music => ipcRenderer.invoke('sendMusicInfo', music),
  quit: () => ipcRenderer.invoke('quit')
}

export { customApi }
