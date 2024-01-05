<script lang="ts">
  import Sortable from 'sortablejs'

  let musics = [
    {
      title: 'A',
      artist: 'a'
    },
    {
      title: 'B',
      artist: 'b'
    },
    {
      title: 'C',
      artist: 'c'
    }
  ]

  let playlist
  $: {
    if (playlist) {
      Sortable.create(playlist)
    }
  }
</script>

{#if musics}
  <div id="playlist-container">
    <div id="playlist" bind:this={playlist}>
      {#each musics as music}
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
{/if}

<style>
  hr {
    border-top: 1px solid gray;
  }

  #playlist {
    overflow-y: scroll;
    flex: 1;
  }

  .title {
    font-size: 2em;
  }

  .artist {
    font-size: 1.5em;
  }
</style>
