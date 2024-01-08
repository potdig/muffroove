import { ElectronAPI } from '@electron-toolkit/preload'
import { CustomAPI } from '../types/custom-api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
