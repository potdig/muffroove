import ElectronStore from 'electron-store'

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

export { getVolume, getWindowSize, setVolume, setWindowSize }
