import { writable, type Writable } from 'svelte/store'

const volume: Writable<number> = writable(1.0, set => {
  window.api.loadVolume().then(loaded => {
    if (loaded) {
      Howler.volume(loaded)
    }
    set(Howler.volume())
  })
})
const loopPlaylist: Writable<boolean> = writable(true)

export { loopPlaylist, volume }
