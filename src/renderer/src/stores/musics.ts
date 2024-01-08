import { derived, writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'
import type { PlayerState } from '../../../types/player-state'
import { playSound, stopSound } from '../lib/player'

const musics: Writable<Music[]> = writable([])
const currentIndex: Writable<number> = writable(0)
const nowPlaying: Writable<boolean> = writable(false)
const playerStates: Writable<[PlayerState, PlayerState]> = writable(['stop', 'stop'])

const currentMusic = derived(
  [musics, currentIndex],
  ([$musics, $currentIndex]) => $musics[$currentIndex]
)

const state = derived(
  [musics, currentIndex, nowPlaying, playerStates],
  ([$musics, $currentIndex, $nowPlaying, $playerStates], set) => {
    if ($playerStates[0] === $playerStates[1]) {
      return
    }
    const currentState = $playerStates[0]
    switch (currentState) {
      case 'stop':
        if ($nowPlaying) {
          stopSound()
        }
        break
      case 'play':
        if (!$nowPlaying) {
          window.api.loadFile($musics[$currentIndex].path).then(music => {
            playSound(music)
          })
        }
        break
      case 'next':
        if ($currentIndex < $musics.length - 1) {
          currentIndex.update(i => i + 1)
        }
        if ($nowPlaying) {
          stopSound()
          setPlayerState('play')
        }
        break
      case 'prev':
        if ($currentIndex > 0) {
          currentIndex.update(i => i - 1)
        }
        if ($nowPlaying) {
          stopSound()
          setPlayerState('play')
        }
        break
      case 'pause':
        break
    }
    set($playerStates)
  }
)

function setPlayerState(state: PlayerState): void {
  playerStates.update(states => [state, states[0]])
}

state.subscribe(state => {
  console.log(state)
})

export { currentIndex, currentMusic, musics, nowPlaying, setPlayerState }
