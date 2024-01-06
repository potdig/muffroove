import { ipcRenderer } from 'electron'

type CustomAPI = {
  play: () => unknown
  openFolder: () => unknown
}

const customApi: CustomAPI = {
  play: () => ipcRenderer.invoke('play'),
  openFolder: async () => await ipcRenderer.invoke('openFolder')
}

export { customApi }
