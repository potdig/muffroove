import { derived, writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'

const musics: Writable<Music[]> = writable([])
const currentIndex: Writable<number> = writable(0)
const nowPlaying: Writable<boolean> = writable(false)

const currentMusic = derived(
  [musics, currentIndex],
  ([$musics, $currentIndex]) => $musics[$currentIndex]
)

export { currentIndex, currentMusic, musics, nowPlaying }
