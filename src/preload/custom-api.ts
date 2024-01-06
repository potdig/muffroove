import { ipcRenderer } from 'electron'

type CustomAPI = {
  loadFile: (string) => unknown
  openFolder: () => unknown
}

const customApi: CustomAPI = {
  loadFile: async path => await ipcRenderer.invoke('loadFile', path),
  openFolder: async () => await ipcRenderer.invoke('openFolder')
}

export { customApi }
