<script lang="ts">
  import Sortable from 'sortablejs'
  import { currentIndex, currentMusic, musics, nowPlaying, stateControl } from '../stores/musics'

  let playlistContainer: HTMLElement
  let playlist: HTMLElement
  let musicTags: HTMLElement[] = []

  $: {
    if (playlist) {
      Sortable.create(playlist, {
        scroll: playlistContainer,
        store: {
          set: sortable => {
            $musics = sortable.toArray().map(id => $musics.find(music => music.hash == id))
            $currentIndex = $musics.findIndex(music => music.hash === $currentMusic.hash)
          },
          get: sortable => sortable.toArray()
        }
      })
    }
  }

  $: {
    scrollTo($currentIndex)
  }

  function switchMusic(e: MouseEvent): void {
    const target = e.target as HTMLElement
    $currentIndex = $musics.findIndex(
      music => music.hash === target.attributes.getNamedItem('data-id').value
    )
    stateControl.set($nowPlaying ? 'replay' : 'play')
  }

  function scrollTo(index: number): void {
    if (musicTags.length > 0) {
      musicTags[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }
</script>

{#if $musics.length > 0}
  <div id="playlist-container" bind:this={playlistContainer}>
    <div id="playlist" bind:this={playlist}>
      {#each $musics as music, index (music.hash)}
        <div
          id="music-{music.hash}"
          data-id={music.hash}
          class="music {index === $currentIndex ? 'current' : ''} {$nowPlaying ? 'playing' : ''}"
          bind:this={musicTags[index]}
          on:dblclick|stopPropagation={switchMusic}
          role="button"
          tabindex={index}
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
    width: 100%;
    border-top: 1px solid gray;

    &::-webkit-scrollbar {
      width: 16px;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #86a5b1;
      border-radius: 8px;
    }
  }

  hr {
    border-top: 1px solid gray;
  }

  #playlist {
    flex: 1;
  }

  .music:hover {
    background: rgba($color: cornflowerblue, $alpha: 0.2);
  }

  .music * {
    pointer-events: none;
  }

  .current {
    background-color: rgba($color: cornflowerblue, $alpha: 0.4) !important;

    &.playing {
      background-color: rgba($color: green, $alpha: 0.4) !important;
    }
  }

  .title {
    font-size: 2em;
  }

  .artist {
    font-size: 1.5em;
  }
</style>
