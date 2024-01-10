import ElectronStore from 'electron-store'
import { Music } from '../types/music'

const store = new ElectronStore()

function getWindowSize(): [number, number] {
  return store.get('windowSize', [900, 670]) as [number, number]
}

function setWindowSize(size: [number, number]): void {
  store.set('windowSize', size)
}

function getVolume(): number {
  return store.get('volume', 1.0) as number
}

function setVolume(volume: number): void {
  store.set('volume', volume)
}

function getPlaylist(): Music[] {
  return store.get('playlist', []) as Music[]
}

function setPlaylist(playlist: Music[]): void {
  store.set('playlist', playlist)
}

export { getPlaylist, getVolume, getWindowSize, setPlaylist, setVolume, setWindowSize }
