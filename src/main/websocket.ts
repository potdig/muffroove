import { WebSocketServer } from 'ws'

function setUpWebSocketServer(): void {
  const wss = new WebSocketServer({ port: 8888 })
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

export { setUpWebSocketServer }
