<template>
  <div class="class-grid">
    <div class="grid-item" v-for="(cls, index) in items" :key="index">
      <div style="height: 400px">
        <ClassGridItem :item="cls" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ClassGridItem from './ClassGridItem.vue'
import { useClassStore } from '@/stores/communityStore'

const classStore = useClassStore()
const items = computed(() => classStore.classes)
</script>

<style scoped>
.class-grid {
  /* max-height: 500px; */
  /* overflow-y: auto; */
  display: grid;
  border-radius: 10px;
  grid-template-columns: repeat(2, minmax(150px, 1fr)); /* 최소 150px, 최대 1fr */
  background-color: #77729f;
  padding: 10px;
}

.class-grid > div:not(:nth-last-child(-n + 2)) {
  border-bottom: 2px solid #ddd;
}

.grid-item {
  /* background-color: #77729f; */
  color: white;
  padding: 10px;
  text-align: center;
  /* padding-left: 0; */
}
</style>
