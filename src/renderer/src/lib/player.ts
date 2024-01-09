import { Howl } from 'howler'
import { nowPlaying, stateControl } from '../stores/musics'

let currentSound: Howl
function playSound(path: string): void {
  currentSound = new Howl({
    src: [path]
  })
  currentSound.on('play', () => {
    nowPlaying.set(true)
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
