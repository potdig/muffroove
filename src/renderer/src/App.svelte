<script lang="ts">
  import Close from 'svelte-material-icons/Close.svelte'
  import Controller from './components/Controller.svelte'
  import Playlist from './components/Playlist.svelte'

  function quit(): void {
    window.api.quit()
  }
</script>

<div class="container">
  <header>
    <p>Muffroove</p>
    <button on:click={quit}><Close width={24} height={24} /></button>
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
    font-size: 1.4em;
    padding-block: 0.2em;
    margin-bottom: 0.2em;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-app-region: drag;
    background-color: rgba($color: black, $alpha: 0.2);

    button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      -webkit-app-region: no-drag;
      width: 36px;
      height: 100%;
      background: none;
      border: none;
      color: inherit;

      &:hover {
        background-color: rgba($color: white, $alpha: 0.1);
      }
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
