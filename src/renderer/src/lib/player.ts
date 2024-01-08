import { Howl } from 'howler'
import { nowPlaying } from '../stores/musics'

let currentSound: Howl
function playSound(path: string): void {
  currentSound = new Howl({
    src: [path]
  })
  currentSound.on('play', () => {
    nowPlaying.set(true)
  })
  currentSound.on('stop', () => {
    nowPlaying.set(false)
  })
  currentSound.on('end', () => {
    nowPlaying.set(false)
  })
  currentSound.play()
}

function stopSound(): void {
  currentSound.stop()
}

export { playSound, stopSound }