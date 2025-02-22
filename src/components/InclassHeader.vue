<template>
  <div class="ich-main">
    <div class="ich-categoryName">{{ prop.item.name }}</div>
    <div class="ich-categoryInfo">{{ prop.item.info }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ClassItem } from '@/interfaces/Community_interface'
const prop = defineProps<{ item: ClassItem }>()
</script>

<style>
.ich-main {
  height: 100px;
  align-content: center;
  color: #d3d3d3;
  background: rgb(32, 32, 32);
  border-bottom: 2px solid;
  border-color: #77729f;
  padding: 15px;
  gap: 10px;
  border-radius: 10px 10px 0 0;
}

.ich-categoryName {
  font-size: 20px;
  margin-bottom: 5px;
}
</style>
