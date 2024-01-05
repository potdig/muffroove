<script lang="ts">
  import Controller from './components/Controller.svelte'
  import Playlist from './components/Playlist.svelte'
</script>

<div class="container">
  <header>
    <p>Muffroove</p>
  </header>

  <main>
    <Controller></Controller>
    <Playlist></Playlist>
  </main>
</div>

<style lang="scss">
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100%;
  }

  header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
  }

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>
