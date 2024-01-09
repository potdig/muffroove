<script lang="ts">
  import Controller from './components/Controller.svelte'
  import Playlist from './components/Playlist.svelte'

  function quit(): void {
    window.api.quit()
  }
</script>

<div class="container">
  <header>
    <p>Muffroove</p>
    <button on:click={quit}>x</button>
  </header>

  <main>
    <Controller></Controller>
    <Playlist></Playlist>
  </main>
</div>

<style lang="scss">
  .container {
    flex: 1;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: auto 1fr;
    margin: 0;
    height: 100vh;
    overflow: hidden;
  }

  header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-app-region: drag;

    button {
      position: absolute;
      right: 0;
      -webkit-app-region: no-drag;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: auto;
  }
</style>
