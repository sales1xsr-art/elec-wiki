<script setup>
import NavSidebar from '@/components/NavSidebar.vue'
</script>

<template>
  <NavSidebar />
  <main class="main-content">
    <router-view />
  </main>
</template>

<style scoped>
.main-content {
  margin-left: 260px;
  min-height: 100vh;
  padding: 48px 56px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 60px 20px 32px;
  }
}
</style>
