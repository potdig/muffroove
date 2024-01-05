<script lang="ts">
  function play() {
    window.api.play()
  }
</script>

<div class="container">
  <header>
    <p>Muffroove</p>
  </header>

  <main>
    <button on:click={play}>&gt;</button>
  </main>
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  header {
    position: relative;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 24px;
  }
</style>
