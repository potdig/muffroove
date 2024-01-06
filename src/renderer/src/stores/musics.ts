import { writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'

const musics: Writable<Music[]> = writable([])

export { musics }
