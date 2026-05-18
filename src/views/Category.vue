<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getCategory, getComponentsByCategory } from '@/data/components.js'

const route = useRoute()
const cat = computed(() => getCategory(route.params.slug))
const items = computed(() => getComponentsByCategory(route.params.slug))
</script>

<template>
  <div v-if="cat">
    <div class="cat-header">
      <span class="cat-icon">{{ cat.icon }}</span>
      <h1 class="cat-title">{{ cat.name }}</h1>
      <p class="cat-desc">{{ cat.desc }}</p>
    </div>

    <div class="comp-list">
      <router-link
        v-for="item in items"
        :key="item.slug"
        :to="`/component/${item.slug}`"
        class="comp-card"
      >
        <div class="comp-badge" :style="{ background: cat.color }">{{ item.symbol }}</div>
        <div class="comp-info">
          <h3 class="comp-name">{{ item.name }}</h3>
          <p class="comp-summary">{{ item.summary }}</p>
        </div>
        <span class="comp-arrow">→</span>
      </router-link>
    </div>

    <div v-if="items.length === 0" class="empty">
      该分类暂无元件数据
    </div>
  </div>

  <div v-else class="empty">
    分类不存在
  </div>
</template>

<style scoped>
.cat-header {
  margin-bottom: 32px;
}

.cat-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.cat-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.cat-desc {
  font-size: 16px;
  color: var(--color-text-secondary);
}

.comp-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comp-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  box-shadow: var(--shadow-sm);
}

.comp-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.comp-badge {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.comp-info {
  flex: 1;
  min-width: 0;
}

.comp-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.comp-summary {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.comp-arrow {
  font-size: 20px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 80px 0;
  font-size: 16px;
}
</style>
