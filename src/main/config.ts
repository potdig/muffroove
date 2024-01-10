import ElectronStore from 'electron-store'
import { Music } from '../types/music'

const store = new ElectronStore()

function loadWindowSize(): [number, number] {
  return store.get('windowSize', [900, 670]) as [number, number]
}

function saveWindowSize(size: [number, number]): void {
  store.set('windowSize', size)
}

function loadVolume(): number {
  return store.get('volume', 1.0) as number
}

function saveVolume(volume: number): void {
  store.set('volume', volume)
}

function loadPlaylist(): Music[] {
  return store.get('playlist', []) as Music[]
}

function savePlaylist(playlist: Music[]): void {
  store.set('playlist', playlist)
}

export { loadPlaylist, loadVolume, loadWindowSize, savePlaylist, saveVolume, saveWindowSize }
