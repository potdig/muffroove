<script lang="ts">
  import { stopSound } from '../lib/player'
  import { currentIndex, musics, stateControl } from '../stores/musics'

  function next(): void {
    stateControl.set('next')
  }

  function prev(): void {
    stateControl.set('prev')
  }

  function play(): void {
    stateControl.set('play')
  }

  function stop(): void {
    stateControl.set('stop')
  }

  async function openFolder(): Promise<void> {
    const loaded = await window.api.openFolder()
    if (loaded.length > 0) {
      stopSound()
      currentIndex.set(0)
      musics.set(loaded)
    }
  }
</script>

<div id="controller">
  <button on:click={prev}>&lt;&lt;</button>
  <button on:click={stop}>[]</button>
  <button on:click={play}>&gt;</button>
  <button on:click={play}>||</button>
  <button on:click={next}>&gt;&gt;</button>
  <button on:click={openFolder}>open folder</button>
</div>

<style>
  #controller {
    display: flex;
    justify-content: center;
  }
</style>
