import { basename } from 'path'
import { WebSocket, WebSocketServer } from 'ws'
import { Music } from '../types/music'
import { loadWebsocketPort } from './config'

let wss: WebSocketServer

let currentMusic: Music | undefined

function setUpWebSocketServer(): void {
  startWebsocketServer()
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

function restartWebsocketServer(): void {
  wss.close()
  startWebsocketServer()
}

function startWebsocketServer(): void {
  const port = loadWebsocketPort()
  wss = new WebSocketServer({ port })
  console.log('Websocket server started with port: ' + port)
}

export { restartWebsocketServer, sendMusicInfo, setCurrentMusic, setUpWebSocketServer }
