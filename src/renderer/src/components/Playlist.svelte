<script lang="ts">
  import Sortable from 'sortablejs'
  import { currentIndex, musics, nowPlaying } from '../stores/musics'

  let playlist
  $: {
    if (playlist) {
      Sortable.create(playlist)
    }
  }
</script>

{#if $musics.length > 0}
  <div id="playlist-container">
    <div id="playlist" bind:this={playlist}>
      {#each $musics as music, index}
        <div
          class="music {index === $currentIndex ? 'current' : ''} {$nowPlaying ? 'playing' : ''}"
        >
          <hr />
          <div>
            <p class="title">{music.title}</p>
            <p class="artist">{music.artist}</p>
          </div>
        </div>
      {/each}
    </div>
    <hr />
  </div>
{:else}
  <p>Open the folder includes MP3.</p>
{/if}

<style lang="scss">
  #playlist-container {
    overflow: auto;
  }

  hr {
    border-top: 1px solid gray;
  }

  #playlist {
    flex: 1;
  }

  .current {
    background-color: rgba($color: cornflowerblue, $alpha: 0.4);

    &.playing {
      background-color: rgba($color: green, $alpha: 0.4);
    }
  }

  .title {
    font-size: 2em;
  }

  .artist {
    font-size: 1.5em;
  }
</style>
