<script lang="ts">
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
</script>

<div id="playlist">
  {#each musics as music}
    <hr />
    <div>
      <p class="title">{music.title}</p>
      <p class="artist">{music.artist}</p>
    </div>
  {/each}
  <hr />
</div>

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
