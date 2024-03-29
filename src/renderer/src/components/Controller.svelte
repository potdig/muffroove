<script lang="ts">
  import Cog from 'svelte-material-icons/Cog.svelte'
  import FolderOpen from 'svelte-material-icons/FolderOpen.svelte'
  import Pause from 'svelte-material-icons/Pause.svelte'
  import Play from 'svelte-material-icons/Play.svelte'
  import SkipBackward from 'svelte-material-icons/SkipBackward.svelte'
  import SkipForward from 'svelte-material-icons/SkipForward.svelte'
  import Stop from 'svelte-material-icons/Stop.svelte'
  import VolumeHigh from 'svelte-material-icons/VolumeHigh.svelte'
  import VolumeLow from 'svelte-material-icons/VolumeLow.svelte'

  import { volume } from '../stores/misc'
  import {
    controllable,
    currentIndex,
    currentMusic,
    musics,
    nowPlaying,
    stateControl
  } from '../stores/musics'
  import Settings from './Settings.svelte'

  const iconWidth = 24

  let settings: Settings

  $: volumeBackground = `linear-gradient(to right, #86a5b1 ${$volume * 100}%, rgba(0, 0, 0, 0) ${
    $volume * 100
  }%)`

  function next(): void {
    stateControl.set('next')
  }

  function prev(): void {
    stateControl.set('prev')
  }

  function play(): void {
    stateControl.set($nowPlaying ? 'replay' : 'play')
  }

  function stop(): void {
    stateControl.set('stop')
  }

  function pause(): void {
    stateControl.set('pause')
  }

  function saveVolume(): void {
    window.api.saveVolume($volume)
  }

  async function openFolder(): Promise<void> {
    const loaded = await window.api.openFolder()
    if (loaded.length > 0) {
      stateControl.set('stop')
      currentMusic.set(loaded[0])
      musics.set(loaded)
      currentIndex.set(0)
      window.api.savePlaylist(loaded)
    }
  }

  function openSettingsDialog(): void {
    settings.open()
  }
</script>

<div id="controller">
  <div id="buttons">
    <button on:click={prev} disabled={!$controllable}
      ><SkipBackward width={iconWidth} height={iconWidth} /></button
    >
    <button on:click={stop} disabled={!$controllable}
      ><Stop width={iconWidth} height={iconWidth} /></button
    >
    <button on:click={play} disabled={!$controllable}
      ><Play width={iconWidth} height={iconWidth} /></button
    >
    <button on:click={pause} disabled={!$controllable}
      ><Pause width={iconWidth} height={iconWidth} /></button
    >
    <button on:click={next} disabled={!$controllable}
      ><SkipForward width={iconWidth} height={iconWidth} /></button
    >
    <button on:click={openFolder} disabled={!$controllable}
      ><FolderOpen width={iconWidth} height={iconWidth} /></button
    >
    <button on:click={openSettingsDialog}>
      <Cog width={iconWidth} height={iconWidth} />
    </button>
  </div>
  <div id="volume">
    <VolumeLow width={iconWidth} height={iconWidth} />
    <input
      type="range"
      bind:value={$volume}
      min="0"
      max="1"
      step="0.01"
      style="color: red;background: {volumeBackground};"
      on:mouseup={saveVolume}
    />
    <VolumeHigh width={iconWidth} height={iconWidth} />
  </div>
</div>
<Settings bind:this={settings} />

<style lang="scss">
  #controller {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.4em;
    margin-block: 0.4em;
  }

  #buttons {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-block: 0.2em;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: none;
    color: inherit;
    border-color: inherit;
    border: 2px solid;
    border-radius: 50%;

    &:disabled {
      opacity: 0.5;
    }
  }

  #volume {
    display: flex;
    gap: 0.4em;
    width: 100%;

    input {
      flex: 1;
      appearance: none;
      background: none;
      border: 1px solid;
      border-color: #86a5b1;

      &::-webkit-slider-thumb {
        opacity: 0;
      }
    }
  }
</style>
