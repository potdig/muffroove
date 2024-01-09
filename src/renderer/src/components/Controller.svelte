<script lang="ts">
  import { stopSound } from '../lib/player'
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
  <button on:click={prev} disabled={!$controllable}>&lt;&lt;</button>
  <button on:click={stop} disabled={!$controllable}>[]</button>
  <button on:click={play} disabled={!$controllable}>&gt;</button>
  <button on:click={play} disabled={!$controllable}>||</button>
  <button on:click={next} disabled={!$controllable}>&gt;&gt;</button>
  <button on:click={openFolder} disabled={!$controllable}>open folder</button>
</div>

<style>
  #controller {
    display: flex;
    justify-content: center;
  }
</style>
