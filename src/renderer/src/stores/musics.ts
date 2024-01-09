import { derived, get, writable, type Writable } from 'svelte/store'
import type { Music } from '../../../types/music'
import type { PlayerState } from '../../../types/player-state'
import { playSound, stopSound } from '../lib/player'

const musics: Writable<Music[]> = writable([])
const currentIndex: Writable<number> = writable(0)
const nowPlaying: Writable<boolean> = writable(false)
const stateControl: Writable<PlayerState> = writable('stop')
const playerState: Writable<PlayerState> = writable('stop')

const currentMusic = derived(
  [musics, currentIndex],
  ([$musics, $currentIndex]) => $musics[$currentIndex]
)

stateControl.subscribe(control => {
  const ms = get(musics)
  const ci = get(currentIndex)
  const np = get(nowPlaying)
  const player = get(playerState)

  console.log(control)
  if (control === player) {
    return
  }
  playerState.set(control)
  switch (control) {
    case 'stop':
      if (np) {
        stopSound()
        nowPlaying.set(false)
      }
      break
    case 'play':
      console.log(np)
      if (!np) {
        window.api.loadFile(ms[ci].path).then(music => {
          playSound(music)
        })
      }
      break
    case 'next':
      if (ci < ms.length - 1) {
        currentIndex.update(i => i + 1)
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

// const state: Readable<PlayerState> = derived(
//   [musics, currentIndex, nowPlaying, stateControl],
//   ([$musics, $currentIndex, $nowPlaying, $stateControl], _, update) => {
//     update(now => {
//       if ($stateControl === now) {
//         return now
//       }
//       switch ($stateControl) {
//         case 'stop':
//           if ($nowPlaying) {
//             stopSound()
//           }
//           break
//         case 'play':
//           if (!$nowPlaying) {
//             window.api.loadFile($musics[$currentIndex].path).then(music => {
//               playSound(music)
//             })
//           }
//           break
//         case 'next':
//           if ($currentIndex < $musics.length - 1) {
//             currentIndex.update(i => i + 1)
//           }
//           if ($nowPlaying) {
//             stopSound()
//             stateControl.set('play')
//           }
//           break
//         case 'prev':
//           if ($currentIndex > 0) {
//             currentIndex.update(i => i - 1)
//           }
//           if ($nowPlaying) {
//             stopSound()
//             stateControl.set('play')
//           }
//           break
//         case 'pause':
//           break
//       }
//       return $stateControl
//     })
//   }
// )

// state.subscribe(state => {
//   console.log(state)
// })

export { currentIndex, currentMusic, musics, nowPlaying, stateControl }
