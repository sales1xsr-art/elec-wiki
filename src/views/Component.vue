<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getComponent, getCategory } from '@/data/components.js'
import { parse } from 'marked'

const route = useRoute()
const comp = computed(() => getComponent(route.params.slug))
const cat = computed(() => {
  if (!comp.value) return null
  return getCategory(comp.value.category)
})

const html = computed(() => {
  if (!comp.value) return ''
  try {
    return parse(comp.value.content)
  } catch {
    return '<p style="color:red">Markdown 解析失败</p>'
  }
})
</script>

<template>
  <div v-if="comp">
    <div class="detail-header">
      <router-link v-if="cat" :to="`/category/${cat.slug}`" class="back-link">
        ← {{ cat.name }}
      </router-link>
      <div class="title-row">
        <div class="comp-badge" :style="{ background: cat?.color || '#64748b' }">
          {{ comp.symbol }}
        </div>
        <div>
          <h1 class="comp-title">{{ comp.name }}</h1>
          <p class="comp-summary">{{ comp.summary }}</p>
        </div>
      </div>
    </div>

    <div v-if="comp.params.length" class="params-section">
      <h3 class="section-label">关键参数</h3>
      <div class="params-tags">
        <span v-for="p in comp.params" :key="p" class="param-tag">{{ p }}</span>
      </div>
    </div>

    <div class="content prose" v-html="html"></div>
  </div>

  <div v-else class="empty">
    <p>元件不存在</p>
    <router-link to="/" class="back-link">返回首页</router-link>
  </div>
</template>

<style scoped>
.detail-header {
  margin-bottom: 24px;
}

.back-link {
  display: inline-block;
  font-size: 14px;
  color: var(--color-accent);
  margin-bottom: 16px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.comp-badge {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.comp-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 4px;
}

.comp-summary {
  font-size: 15px;
  color: var(--color-text-secondary);
}

.params-section {
  margin-bottom: 24px;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.params-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.param-tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-accent-light);
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-mono);
  border-radius: var(--radius-full);
}

.empty {
  text-align: center;
  padding: 80px 0;
  font-size: 16px;
  color: var(--color-text-muted);
}
</style>

<style>
.prose {
  max-width: 720px;
  line-height: 1.8;
  color: var(--color-text-primary);
}

.prose h2 {
  font-size: 22px;
  margin: 36px 0 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.prose h3 {
  font-size: 17px;
  margin: 24px 0 10px;
}

.prose p {
  margin: 10px 0;
}

.prose ul {
  list-style: disc;
  padding-left: 20px;
  margin: 8px 0;
}

.prose blockquote {
  border-left: 3px solid var(--color-accent);
  padding: 10px 16px;
  margin: 16px 0;
  background: var(--color-accent-light);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--color-text-secondary);
}

.prose table {
  margin: 16px 0;
  font-size: 14px;
}

.prose th {
  background: var(--color-bg-muted);
  padding: 8px 14px;
  text-align: left;
  font-weight: 600;
}

.prose td {
  padding: 8px 14px;
  border-bottom: 1px solid var(--color-border-light);
}

.prose code {
  background: var(--color-code-bg);
  color: var(--color-code-text);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

.prose pre {
  background: var(--color-scope-bg);
  color: var(--color-scope-trace);
  padding: 16px 20px;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: 14px 0;
  font-size: 14px;
  line-height: 1.6;
}
</style>
