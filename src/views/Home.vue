<script setup>
import { categories } from '@/data/components.js'
</script>

<template>
  <div class="hero">
    <h1 class="hero-title">元器件科普百科</h1>
    <p class="hero-desc">从零开始认识每一个电子元件，理解它们的工作原理与实际应用</p>
  </div>

  <section class="categories">
    <h2 class="section-title">探索分类</h2>
    <div class="card-grid">
      <router-link
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/category/${cat.slug}`"
        class="cat-card"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <h3 class="cat-name">{{ cat.name }}</h3>
        <p class="cat-desc">{{ cat.desc }}</p>
        <span class="cat-link">查看全部 →</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 60px 0 48px;
}

.hero-title {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -1px;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.hero-desc {
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
}

.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: var(--color-text-primary);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.cat-card {
  display: block;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
}

.cat-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 36px;
  display: block;
  margin-bottom: 12px;
}

.cat-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.cat-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 14px;
}

.cat-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
}
</style>
