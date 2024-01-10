import { basename } from 'path'
import { WebSocket, WebSocketServer } from 'ws'
import { Music } from '../types/music'

const wss: WebSocketServer = new WebSocketServer({ port: 8888 })

let currentMusic: Music | undefined

function setUpWebSocketServer(): void {
  wss.on('connection', ws => {
    sendMusicInfo(new Set([ws]))
  })
}

function setCurrentMusic(music: Music | undefined): void {
  currentMusic = music
}

function sendMusicInfo(clients: Set<WebSocket> = wss.clients): void {
  clients.forEach(client => {
    if (!currentMusic) {
      client.send('stop')
      return
    }

    if (!currentMusic.title) {
      client.send(`play ${basename(currentMusic.path, '.mp3')}`)
    }

    const musicInfo = currentMusic.artist
      ? `${currentMusic.title} / ${currentMusic.artist}`
      : currentMusic.title
    client.send(`play ${musicInfo}`)
  })
}

export { sendMusicInfo, setCurrentMusic, setUpWebSocketServer }
