<script lang="ts">
  import { playSound, stopSound } from '../lib/player'
  import { currentIndex, musics, nowPlaying } from '../stores/musics'

  function next() {
    if ($currentIndex < $musics.length - 1) {
      currentIndex.update(i => i + 1)
    }
    if ($nowPlaying) {
      stop()
      play()
    }
  }

  function prev() {
    if ($currentIndex > 0) {
      currentIndex.update(i => i - 1)
    }
    if ($nowPlaying) {
      stop()
      play()
    }
  }

  async function play() {
    if ($musics.length > 0) {
      const music = await window.api.loadFile($musics[$currentIndex].path)
      playSound(music)
    }
  }

  function stop() {
    stopSound()
  }

  async function openFolder() {
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
