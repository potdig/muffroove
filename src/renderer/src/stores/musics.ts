import { writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'

const musics: Writable<Music[]> = writable([])
const currentIndex: Writable<number> = writable(0)
const nowPlaying: Writable<boolean> = writable(false)

export { currentIndex, musics, nowPlaying }
