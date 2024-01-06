<script lang="ts">
  import { musics } from '../stores/musics'

  function play() {
    window.api.play()
  }

  async function openFolder() {
    musics.set(await window.api.openFolder())
  }
</script>

<div id="controller">
  <button on:click={play}>&lt;&lt;</button>
  <button on:click={play}>||</button>
  <button on:click={play}>&gt;</button>
  <button on:click={play}>&gt;&gt;</button>
  <button on:click={openFolder}>open folder</button>
</div>

<style>
  #controller {
    display: flex;
    justify-content: center;
  }
</style>
