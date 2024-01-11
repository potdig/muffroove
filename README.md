# Muffroove

Music Player + Websocket

<img src="https://github.com/potdig/muffroove/blob/master/docs/capture.png?raw=true" width="70%">

## Supported Format

- MP3

## Installation

Download installer from release and execute.

## Usage

### Controller Buttons (from left)

|               Button Name | Description                                                                                                           |
| ------------------------: | :-------------------------------------------------------------------------------------------------------------------- |
|    Skip backward (`\|<<`) | Skip to the previous track from the current track. If the first track is current, skip to the last track in playlist. |
|               Stop (`[]`) | Stop the playing track. If pausing, seek to the beginning of sound.                                                   |
|                Play (`>`) | Play the current track. If playing, replay the current track.                                                         |
|            Pause (`\|\|`) | Pause the current track.                                                                                              |
|     Move forward (`>>\|`) | Skip to the next track from the current track. If the last track is current, skip to the first track in playlist.     |
| Open folder (folder icon) | Open the folder contains music files.                                                                                 |
|      Settings (gear icon) | Open the settings dialog.                                                                                             |

### Playlist

- Drag and drop to change the order of playlist
- Double click to play the track.

### Settings

|        Setting | Description                                                                                              |
| -------------: | :------------------------------------------------------------------------------------------------------- |
| Websocket Port | Port number for the Websocket server. You can restart the server with `Restart websocket server` button. |

## Websocket Server

You can connect to the Websocket server from client.

### Message Specification

|                   Message | Description                                                                                                                           |
| ------------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
| `play {title} / {artist}` | Sent when a track is played or connected to the server while the track is playing, if the track has both of title/artist information. |
|            `play {title}` | Sent when a track is played or connected to the server while the track is playing, if the track only has title information.           |
|         `play {filename}` | Sent when a track is played or connected to the server while the track is playing, if the track doesn't have title information.       |
|                    `stop` | Sent when a track is stopped or connected to the server while the track is stopped.                                                   |

### Example

```javascript
// Change to the port number set in the settings dialog
const port = 8888

// Create Websocket client
const socket = new WebSocket(`ws://localhost:${port}`)

// Handle messages from the server
socket.addEventListener('message', event => {
  const message = event.data
  if (message.startsWith('play')) {
    // message => 'play title / artist'

    const info = message.replace(/^play /, '').split(' / ')
    // info[0] => title, info[1] => artist
  }
})
```

## Etc.

### Build for your platform

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
