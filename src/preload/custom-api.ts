import { ipcRenderer } from 'electron'
import { CustomAPI } from '../types/custom-api'

const customApi: CustomAPI = {
  loadFile: async path => await ipcRenderer.invoke('loadFile', path),
  openFolder: async () => await ipcRenderer.invoke('openFolder'),
  sendMusicInfo: music => ipcRenderer.invoke('sendMusicInfo', music),
  saveVolume: volume => ipcRenderer.invoke('saveVolume', volume),
  loadVolume: async () => await ipcRenderer.invoke('loadVolume'),
  quit: () => ipcRenderer.invoke('quit')
}

export { customApi }
