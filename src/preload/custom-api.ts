import { ipcRenderer } from 'electron'
import { CustomAPI } from '../types/custom-api'

const customApi: CustomAPI = {
  loadFile: async path => await ipcRenderer.invoke('loadFile', path),
  openFolder: async () => await ipcRenderer.invoke('openFolder'),
  sendMusicInfo: music => ipcRenderer.invoke('sendMusicInfo', music),
  saveVolume: volume => ipcRenderer.invoke('saveVolume', volume),
  loadVolume: async () => await ipcRenderer.invoke('loadVolume'),
  savePlaylist: playlist => ipcRenderer.invoke('savePlaylist', playlist),
  loadPlaylist: async () => await ipcRenderer.invoke('loadPlaylist'),
  saveWebsocketPort: port => ipcRenderer.invoke('saveWebsocketPort', port),
  loadWebsocketPort: async () => await ipcRenderer.invoke('loadWebsocketPort'),
  restartWebsocketServer: async () => await ipcRenderer.invoke('restartWebsocketServer'),
  quit: () => ipcRenderer.invoke('quit')
}

export { customApi }
