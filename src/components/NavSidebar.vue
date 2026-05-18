<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { categories } from '@/data/components.js'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const collapsed = ref(false)
const mobileOpen = ref(false)

const currentCategory = computed(() => route.params.slug || '')

function goHome() {
  router.push('/')
  mobileOpen.value = false
}

function goCategory(slug) {
  router.push(`/category/${slug}`)
  mobileOpen.value = false
}

function toggleTheme() {
  const html = document.documentElement
  const current = html.getAttribute('data-theme')
  html.setAttribute('data-theme', current === 'dark' ? '' : 'dark')
}
</script>

<template>
  <button class="menu-btn" @click="mobileOpen = !mobileOpen" aria-label="菜单">
    <span></span><span></span><span></span>
  </button>

  <div class="overlay" v-show="mobileOpen" @click="mobileOpen = false"></div>

  <aside :class="['sidebar', { open: mobileOpen }]">
    <div class="sidebar-brand" @click="goHome">
      <span class="brand-icon">🔬</span>
      <span class="brand-text">元器件百科</span>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }" @click="mobileOpen = false">
        <span class="nav-icon">🏠</span>
        <span>首页</span>
      </router-link>

      <div class="nav-section-label">元件分类</div>

      <router-link
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/category/${cat.slug}`"
        class="nav-item"
        :class="{ active: currentCategory === cat.slug }"
        @click="mobileOpen = false"
      >
        <span class="nav-icon">{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button class="theme-btn" @click="toggleTheme" title="切换主题">
        🌓
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  background: var(--color-bg-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 0 16px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 8px;
}

.brand-icon {
  font-size: 24px;
}

.brand-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
}

.nav-section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-text-muted);
  padding: 16px 12px 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: 15px;
  margin-bottom: 2px;
}

.nav-item:hover {
  background: var(--color-bg-muted);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: var(--color-accent-light);
  color: var(--color-accent);
  font-weight: 600;
}

.nav-icon {
  font-size: 16px;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid var(--color-border-light);
}

.theme-btn {
  width: 36px;
  height: 36px;
  font-size: 18px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-btn:hover {
  background: var(--color-bg-muted);
}

.menu-btn {
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 200;
  width: 40px;
  height: 40px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px;
}

.menu-btn span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 1px;
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 99;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .menu-btn {
    display: flex;
  }
  .overlay {
    display: block;
  }
}
</style>
