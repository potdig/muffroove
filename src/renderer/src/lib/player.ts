import { Howl } from 'howler'

function playSound(path: string) {
  const sound = new Howl({
    src: [path]
  })
  sound.play()
}

export { playSound }
