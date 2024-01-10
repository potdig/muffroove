<script lang="ts">
  let visibility = 'hidden'
  let websocketPort

  window.api.loadWebsocketPort().then(loaded => {
    websocketPort = loaded
  })

  export function open(): void {
    visibility = 'visible'
  }

  function ok(): void {
    window.api.saveWebsocketPort(websocketPort)
    close()
  }

  function close(): void {
    visibility = 'hidden'
  }

  async function restartWebsocketServer(): Promise<void> {
    window.api.saveWebsocketPort(websocketPort)
    await window.api.restartWebsocketServer()
    close()
  }
</script>

<div id="background" style="visibility: {visibility};">
  <div id="dialog">
    <div id="form-area">
      <label for="websocket-port">Websocket Port</label>
      <div class="form-item">
        <input type="number" min="1" max="65535" bind:value={websocketPort} />
      </div>
    </div>
    <div id="button-area">
      <button on:click={ok}>OK</button>
      <button on:click={close}>Cancel</button>
    </div>
    <div id="danger-area">
      <button on:click={restartWebsocketServer}>Restart websocket server</button>
    </div>
  </div>
</div>

<style lang="scss">
  #background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: black, $alpha: 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #dialog {
    background-color: #2f3241;
    display: flex;
    flex-direction: column;
    padding: 24px;
    font-size: 1.1em;
    gap: 24px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba($color: black, $alpha: 0.4);
  }

  #form-area {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 16px;

    input[type='number'] {
      background: none;
      border: none;
      border-bottom: 1px solid;
      border-color: inherit;
      color: inherit;
      font-size: 1.1em;
    }
  }

  label {
    font-weight: bold;
  }

  #button-area {
    display: flex;
    justify-content: center;
    gap: 24px;
  }

  #danger-area {
    display: flex;
    justify-content: center;
    margin-top: 48px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: inherit;
    border-color: inherit;
    border: 2px solid;
    border-radius: 8px;
    padding: 0.4em 0.8em;

    #danger-area & {
      border-color: deeppink;
      color: deeppink;
    }
  }
</style>
