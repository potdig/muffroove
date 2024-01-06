<script lang="ts">
  import Controller from './components/Controller.svelte'
  import Playlist from './components/Playlist.svelte'
</script>

<div class="container">
  <header>
    <p>Muffroove</p>
    <Controller></Controller>
  </header>

  <main>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  main {
    display: grid;
    grid-auto-flow: column;
    height: 100%;
    overflow: auto;
  }
</style>
