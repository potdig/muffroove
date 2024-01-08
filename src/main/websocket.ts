import { basename } from 'path'
import { WebSocketServer } from 'ws'
import { Music } from '../types/music'

const wss: WebSocketServer = new WebSocketServer({ port: 8888 })

function setUpWebSocketServer(): void {
  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log('Message: %s', message)
      const msgString = message.toString()
      if (msgString === 'get') {
        ws.send('hi')
      }
    })
  })
}

function sendMusicInfo(music: Music | undefined): void {
  wss.clients.forEach(client => {
    if (!music) {
      client.send('stop')
      return
    }

    if (!music.title) {
      client.send(`play ${basename(music.path, '.mp3')}`)
    }

    const musicInfo = music.artist ? `${music.title} / ${music.artist}` : music.title
    client.send(`play ${musicInfo}`)
  })
}

export { sendMusicInfo, setUpWebSocketServer }
