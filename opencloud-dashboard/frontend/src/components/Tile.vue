<template>
  <div class="tile">
    <h3>{{ app.name }}</h3>
    <button @click="installApp">Install / Open</button>
  </div>
</template>

<script>
export default {
  props: ["app"],
  methods: {
    async installApp() {
      await fetch(`http://localhost:3000/api/apps/${this.app.id}/install`, { method: 'POST' });
    }
  }
};
</script>