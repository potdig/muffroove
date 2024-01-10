import { get, writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'
import type { PlayerState } from '../../../types/player-state'
import { changeVolume, pauseSound, playSound, resumeSound, stopSound } from '../lib/player'
import { loopPlaylist, volume } from './misc'

const musics: Writable<Music[]> = writable([])
const currentIndex: Writable<number> = writable(0)
const currentMusic: Writable<Music> = writable(undefined)
const nowPlaying: Writable<boolean> = writable(false)
const stateControl: Writable<PlayerState> = writable('stop')
const playerState: Writable<PlayerState> = writable('stop')
const controllable: Writable<boolean> = writable(true)

stateControl.subscribe(control => {
  if (!controllable) {
    return
  }
  controllable.set(false)

  const ms = get(musics)
  const ci = get(currentIndex)
  const np = get(nowPlaying)
  const ps = get(playerState)
  const lp = get(loopPlaylist)

  switch (control) {
    case 'stop':
      stopSound()
      nowPlaying.set(false)
      controllable.set(true)
      window.api.sendMusicInfo(null)
      break
    case 'play':
      if (!np) {
        if (ps === 'pause') {
          resumeSound()
        } else {
          playSound(ms[ci])
        }
      } else {
        stopSound()
        playSound(ms[ci])
      }
      break
    case 'next':
      if (ci < ms.length - 1) {
        currentIndex.update(i => i + 1)
        playerState.set('next')
      } else {
        if (lp) {
          currentIndex.set(0)
          playerState.set('next')
        } else {
          stateControl.set('stop')
          break
        }
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
      } else {
        currentIndex.set(ms.length - 1)
      }
      playerState.set('prev')
      if (np) {
        stopSound()
        nowPlaying.set(false)
        stateControl.set('play')
      } else {
        stateControl.set('stop')
      }
      break
    case 'pause':
      if (np) {
        pauseSound()
        nowPlaying.set(false)
        playerState.set('pause')
        controllable.set(true)
      }
      break
    case 'replay':
      playerState.set('replay')
      if (np) {
        stopSound()
        nowPlaying.set(false)
      }
      stateControl.set('play')
  }
})

playerState.subscribe(state => {
  console.log(`control fired: ${state}`)
})

volume.subscribe(volume => {
  changeVolume(volume)
})

export { controllable, currentIndex, currentMusic, musics, nowPlaying, stateControl }
