<script lang="ts">
  import Sortable from 'sortablejs'
  import { musics } from '../stores/musics'

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
      {#each $musics as music}
        <div class="music">
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

<style>
  #playlist-container {
    overflow: auto;
  }

  hr {
    border-top: 1px solid gray;
  }

  #playlist {
    flex: 1;
  }

  .title {
    font-size: 2em;
  }

  .artist {
    font-size: 1.5em;
  }
</style>
