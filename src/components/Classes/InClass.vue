<template>
  <div class="ClassListMain">
    <div
      style="
        border: 2px solid;
        border-color: #77729f;
        border-radius: 10px;
        background: rgb(32, 32, 32);
      "
    >
      <InclassHeader :item="currentClass!" />
      <div class="class-write">
        <router-link
          class="class-write-bnt"
          :to="{
            name: 'write',
            params: {},
          }"
        >
          글쓰기
        </router-link>
      </div>
      <div class="classBackground">
        <div class="classCategory">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="{
              name: 'classes',
              params: {
                classId: currentClass?.id,
                categoryName: category.name,
              },
            }"
            @click="onClicked(category.id)"
            active-class="active"
            class="categoryRouter"
          >
            {{ category.name }}
          </router-link>
          <div class="dummy"></div>
        </div>
        <div class="postTable">
          <div class="postHeader">
            <div class="table-inner">
              <div class="table-top">
                <span class="table-id">{{ headItem.id }} </span>
                <span class="table-title">{{ headItem.title }} </span>
              </div>
              <div class="table-bottom">
                <span class="table-auto"> {{ headItem.owner }} </span>
                <span class="table-time"> {{ headItem.create_at }} </span>
              </div>
            </div>
          </div>
          <div class="postList">
            <PostList v-for="test in list" :key="test.id" :items="test" />
          </div>
        </div>
      </div>
    </div>
    <div>111</div>
  </div>
</template>

<script setup lang="ts">
import PostList from './PostList.vue'
import '@/assets/InClass.css'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import InclassHeader from '../InclassHeader.vue'
import { useClassStore } from '@/stores/communityStore'

const classStore = useClassStore()

const router = useRouter()

const categories = classStore.categories
const currentCategory = classStore.selectedCategoryId
const currentClass = classStore.selectedClass
const list = computed(() => classStore.writes)

const headItem = {
  title: '제목',
  owner: '작성자',
  create_at: '작성일',
  own: 0,
  id: '번호',
}

function onClicked(categoryId: number) {
  classStore.setSelectedCategory(categoryId)
}

onMounted(async () => {
  await classStore.fetchWritesForCategory(1)
})

watch(
  () => classStore.selectedCategoryId,
  async (newCategoryId, oldCategoryId) => {
    if (newCategoryId && newCategoryId !== oldCategoryId) {
      await classStore.fetchWritesForCategory(newCategoryId)
      console.log('fetchWritesForCategory', classStore.selectedCategoryId)
    }
  },
)
</script>

<style></style>
