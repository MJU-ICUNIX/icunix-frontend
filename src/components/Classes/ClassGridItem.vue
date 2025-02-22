<template>
  <div class="tete" style="padding: 10px; border-right: 1px solid #ddd">
    <div class="classItemMain">
      <router-link
        class="classItemHeader"
        :to="{
          name: 'classes',
          params: {
            classId: props.item.id,
            categoryName: props.item.name,
          },
        }"
        @click="onClicked"
      >
        <div class="className">{{ props.item.name }}</div>
        <span class="classRouteButton">></span>
      </router-link>
    </div>
    <div class="text-list">11111</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { ClassItem } from '@/interfaces/Community_interface'
import { onMounted } from 'vue'
import { useClassStore } from '@/stores/communityStore'

const classStore = useClassStore()

const props = defineProps<{ item: ClassItem }>()

const classId = props.item.id

const router = useRouter()

function onClicked() {
  classStore.setSelectedClass(props.item.id)
}
</script>

<style>
.classItemMain {
  margin-bottom: 15px;
}

.classItemHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  text-decoration: none;
  color: white;
}

.classItemHeader:hover {
  background-color: transparent !important;
}

.className {
  border-bottom: 3px solid #f2c53d;
  padding-bottom: 5px;
}

.classRouteButton {
  color: #f2c53d;
  font-size: 1.25em;
  /* font-weight: bold; */
}

.text-list {
  height: 200px;
}
</style>
