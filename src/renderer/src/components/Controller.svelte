<script lang="ts">
  import { playSound, stopSound } from '../lib/player'
  import { currentIndex, currentMusic, musics, nowPlaying } from '../stores/musics'

  function next(): void {
    if ($currentIndex < $musics.length - 1) {
      currentIndex.update(i => i + 1)
    }
    if ($nowPlaying) {
      stop()
      play()
    }
  }

  function prev(): void {
    if ($currentIndex > 0) {
      currentIndex.update(i => i - 1)
    }
    if ($nowPlaying) {
      stop()
      play()
    }
  }

  async function play(): Promise<void> {
    if ($musics.length > 0) {
      const music = await window.api.loadFile($musics[$currentIndex].path)
      playSound(music)
      window.api.sendMusicInfo($currentMusic)
    }
  }

  function stop(): void {
    stopSound()
  }

  async function openFolder(): Promise<void> {
    musics.set(await window.api.openFolder())
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
