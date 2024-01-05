<script lang="ts">
  function play() {
    window.api.play()
  }
</script>

<div id="controller">
  <button on:click={play}>&lt;&lt;</button>
  <button on:click={play}>||</button>
  <button on:click={play}>&gt;</button>
  <button on:click={play}>&gt;&gt;</button>
</div>

<style>
  #controller {
    display: flex;
    justify-content: center;
  }
</style>
