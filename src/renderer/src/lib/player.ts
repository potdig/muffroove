import { Howl } from 'howler'
import type { Music } from '../../../types/music'
import { controllable, currentMusic, nowPlaying, stateControl } from '../stores/musics'

let currentSound: Howl

function playSound(music: Music): void {
  window.api.loadFile(music.path).then(src => {
    currentSound = new Howl({
      src: [src]
    })
    currentSound.on('play', () => {
      nowPlaying.set(true)
      // must change here to prevent duplicated control
      controllable.set(true)
      currentMusic.set(music)
      window.api.sendMusicInfo(music)
    })
    currentSound.on('end', () => {
      stateControl.set('next')
    })
    currentSound.play()
  })
}

function stopSound(): void {
  currentSound?.stop()
  currentSound?.seek(0)
}

function pauseSound(): void {
  currentSound?.pause()
}

function resumeSound(): void {
  currentSound?.play()
}

function changeVolume(volume: number): void {
  Howler.volume(volume)
}
export { changeVolume, pauseSound, playSound, resumeSound, stopSound }
