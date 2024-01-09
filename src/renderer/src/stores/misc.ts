import { writable, type Writable } from 'svelte/store'

const volume: Writable<number> = writable(1.0, set => {
  set(Howler.volume())
})
const loopPlaylist: Writable<boolean> = writable(true)

export { loopPlaylist, volume }
