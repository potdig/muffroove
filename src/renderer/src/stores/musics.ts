import { derived, get, writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'
import type { PlayerState } from '../../../types/player-state'
import { changeVolume, playSound, stopSound } from '../lib/player'

const musics: Writable<Music[]> = writable([])
const currentIndex: Writable<number> = writable(0)
const nowPlaying: Writable<boolean> = writable(false)
const stateControl: Writable<PlayerState> = writable('stop')
const playerState: Writable<PlayerState> = writable('stop')
const controllable: Writable<boolean> = writable(true)
const volume: Writable<number> = writable(1.0, set => {
  set(Howler.volume())
})

const currentMusic = derived(
  [musics, currentIndex],
  ([$musics, $currentIndex]) => $musics[$currentIndex]
)

stateControl.subscribe(control => {
  if (!controllable) {
    return
  }
  controllable.set(false)

  const ms = get(musics)
  const ci = get(currentIndex)
  const np = get(nowPlaying)

  switch (control) {
    case 'stop':
      if (np) {
        stopSound()
        nowPlaying.set(false)
      }
      controllable.set(true)
      break
    case 'play':
      if (!np) {
        playSound(ms[ci])
      }
      break
    case 'next':
      if (ci < ms.length - 1) {
        currentIndex.update(i => i + 1)
        playerState.set('next')
      } else {
        stateControl.set('stop')
        break
      }
      if (np) {
        stopSound()
        nowPlaying.set(false)
        stateControl.set('play')
      } else {
        stateControl.set('stop')
      }
      break
    case 'prev':
      if (ci > 0) {
        currentIndex.update(i => i - 1)
        playerState.set('prev')
      } else {
        break
      }
      if (np) {
        stopSound()
        nowPlaying.set(false)
        stateControl.set('play')
      } else {
        stateControl.set('stop')
      }
      break
    case 'pause':
      break
  }
})

playerState.subscribe(state => {
  console.log(`control fired: ${state}`)
})

volume.subscribe(volume => {
  changeVolume(volume)
})

export { controllable, currentIndex, currentMusic, musics, nowPlaying, stateControl, volume }
