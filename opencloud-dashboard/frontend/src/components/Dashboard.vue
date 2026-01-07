<template>
  <div class="dashboard">
    <Tile v-for="app in apps" :key="app.id" :app="app" />
  </div>
</template>

<script>
import Tile from "./Tile.vue";
export default {
  components: { Tile },
  data() { return { apps: [] }; },
  async mounted() {
    const res = await fetch("http://localhost:3000/api/apps");
    this.apps = await res.json();
  }
};
</script>