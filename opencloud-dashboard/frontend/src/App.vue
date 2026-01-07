<template>
  <div id="app">
    <StatusBar />
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
import StatusBar from './components/StatusBar.vue';
export default { components: { Dashboard, StatusBar } };
</script>