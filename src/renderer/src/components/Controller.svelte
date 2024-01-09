<script lang="ts">
  import { volume } from '../stores/misc'
  import { controllable, currentIndex, musics, stateControl } from '../stores/musics'

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

  function pause(): void {
    stateControl.set('pause')
  }

  async function openFolder(): Promise<void> {
    const loaded = await window.api.openFolder()
    if (loaded.length > 0) {
      stateControl.set('stop')
      currentIndex.set(0)
      musics.set(loaded)
    }
  }
</script>

<div id="controller">
  <div id="buttons">
    <button on:click={prev} disabled={!$controllable}>&lt;&lt;</button>
    <button on:click={stop} disabled={!$controllable}>[]</button>
    <button on:click={play} disabled={!$controllable}>&gt;</button>
    <button on:click={pause} disabled={!$controllable}>||</button>
    <button on:click={next} disabled={!$controllable}>&gt;&gt;</button>
    <button on:click={openFolder} disabled={!$controllable}>open folder</button>
  </div>
  <div id="volume">
    <input type="range" bind:value={$volume} min="0" max="1" step="0.01" />
  </div>
</div>

<style>
  #controller {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #buttons {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  #volume input {
    width: 100%;
  }
</style>
