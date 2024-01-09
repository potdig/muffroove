import { Howl } from 'howler'
import { controllable, nowPlaying, stateControl } from '../stores/musics'

let currentSound: Howl
function playSound(path: string): void {
  currentSound = new Howl({
    src: [path]
  })
  currentSound.on('play', () => {
    nowPlaying.set(true)
    // must change here to prevent duplicated control
    controllable.set(true)
  })
  currentSound.on('end', () => {
    stateControl.set('next')
  })
  currentSound.play()
}

function stopSound(): void {
  currentSound?.stop()
}

export { playSound, stopSound }
