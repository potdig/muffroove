import { Howl } from 'howler'
import type { Music } from '../../../types/music'
import { controllable, nowPlaying, stateControl } from '../stores/musics'

const currentSounds: { [hash: string]: Howl } = {}
let playingSound: Howl

function loadSounds(musics: Music[]): void {
  console.log(musics)
  Object.keys(currentSounds).forEach(hash => {
    if (!musics.find(music => music.hash === hash) && playingSound !== currentSounds[hash]) {
      currentSounds[hash].unload()
      delete currentSounds[hash]
    }
  })
  musics.forEach(music => {
    if (Object.keys(currentSounds).includes(music.hash)) {
      return
    }
    window.api.loadFile(music.path).then(src => {
      const sound = new Howl({
        src: [src]
      })
      currentSounds[music.hash] = sound
      sound.load()
    })
  })
}

function waitSoundFor(hash: string, callback: (howl: Howl) => void): void {
  if (!currentSounds[hash]) {
    setTimeout(() => {
      waitSoundFor(hash, callback)
    }, 10)
  } else {
    callback(currentSounds[hash])
  }
}

function playSound(music: Music): void {
  waitSoundFor(music.hash, sound => {
    playingSound = sound
    playingSound.on('play', () => {
      nowPlaying.set(true)
      // must change here to prevent duplicated control
      controllable.set(true)
      window.api.sendMusicInfo(music)
    })
    playingSound.on('end', () => {
      stateControl.set('next')
    })
    playingSound.play()
  })
}

function stopSound(): void {
  playingSound?.stop()
  playingSound?.seek(0)
}

function pauseSound(): void {
  playingSound?.pause()
}

function resumeSound(): void {
  playingSound?.play()
}

function changeVolume(volume: number): void {
  Howler.volume(volume)
}
export { changeVolume, pauseSound, playSound, resumeSound, stopSound, loadSounds }
