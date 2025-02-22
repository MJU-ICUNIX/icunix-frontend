<template>
  <router-link
    class="table-column"
    :to="{
      name: 'postWithCategory',
      params: {
        classId: classStore.selectedClass?.id,
        categoryId: classStore.selectedCategoryId,
        postId: props.items.id,
      },
    }"
    @click="onclicked()"
  >
    <div class="table-inner">
      <div class="table-top">
        <span class="table-id">
          {{ props.items.id }}
        </span>
        <span class="table-title"
          ><span class="table-data">{{ props.items.title }}</span>
        </span>
      </div>
      <div class="table-bottom">
        <span class="table-auto"
          ><span class="table-data">{{ props.items.owner }}</span></span
        >
        <span class="table-time">{{ props.items.create_at }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { WriteItem } from '@/interfaces/Community_interface'
import { useClassStore } from '@/stores/communityStore'
const classStore = useClassStore()

const props = defineProps<{
  items: WriteItem
}>()

function onclicked() {
  console.log('clicked', props.items.id, classStore.selectedCategoryId)
}
</script>

<style>
.table-column {
  text-decoration: none;
}

.table-data {
  text-overflow: ellipsis;
  overflow: hidden;
  align-items: center;
  text-align: left;
}
</style>
