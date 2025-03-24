<template>
  <profile />
  <div class="body">
    <div class="article-main">
      <div class="article-view">
        <LogoHeader />
        <!-- <div class="article-wrapper">{{ categoryId }}</div> -->
        <div class="article-bg">
          <div class="article-inner-bg">
            <InclassHeader :item="classStore.selectedClass!" />
            <div class="article-main-bg">
              <div class="article-title">{{ currentWrite.title }}</div>
              <div class="article-info">
                <div class="article-member-info">
                  {{ currentWrite.owner }}
                </div>
                <div class="article-article-info">
                  <span class="article-create-at"> 작성일: {{ currentWrite.create_at }}</span>
                  <span class="article-update-at"> 수정일: {{ currentWrite.updated_at }}</span>
                </div>
              </div>
              <div class="article-body">{{ currentWrite.writes }}</div>
              <div class="article-share"><button class="article-share-btn">공유</button></div>
              <div class="article-comments">
                <div class="article-comments-title">댓글</div>
                <div class="article-comments-list">
                  <div class="article-comments-item" v-for="cm in currentComments">
                    <CommentInner :cmt="cm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InClass :item="categoryId" />
    </div>
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import menuItems from '@/assets/menus'
import Navbar from '@/components/Navbar.vue'
import profile from '@/components/profile.vue'
import InClass from '@/components/Classes/InClass.vue'
import MenuListButton from '@/components/menuListButton.vue'
import { useClassStore } from '@/stores/communityStore'
import { onMounted, computed } from 'vue'
import CommentInner from '@/components/Classes/CommentInner.vue'
import LogoHeader from '@/components/LogoHeader.vue'
import InclassHeader from '@/components/InclassHeader.vue'

const classStore = useClassStore()

const props = defineProps<{ classId: string; categoryId: string; postId: string }>()
const categoryId = props.categoryId
const currentWrite = computed(() => {
  const index = Number(props.postId) - 1
  return classStore.writes[index]
})

const currentComments = computed(() => classStore.comments)
console.dir(classStore, { depth: null })
console.log(':currentComments', currentComments)

onMounted(async () => {
  await classStore.fetchCommentsForWrite(Number(props.postId) - 1)
  console.log(':comments', classStore.comments)
})
</script>

<style>
.article-body {
  display: flex;
  justify-content: center;
  padding: 50px;
  gap: 30px;
}

.article-bg {
  background: #26232d;
  width: 1100px;
  padding: 25px 25px 0 25px;
  border-radius: 10px 10px 0 0;
}

.article-inner-bg {
  border: 2px solid;
  border-color: #77729f;
  border-radius: 10px;
}

.article-main-bg {
  background: rgb(32, 32, 32);
  padding: 15px;
  border-radius: 10px;
  color: #d3d3d3;
}

.article-title {
  /* margin-top: 10px; */
  background: rgb(59, 59, 59);
  font-size: 22px;
  padding: 10px;
  border-bottom: 2px solid;
  border-color: #f2c53d;
  border-radius: 5px 5px 0 0;
}

.article-info {
  padding: 5px 10px 5px 10px;
  border-bottom: 2px solid;
  border-color: #77729f;
}

.article-member-info {
  display: inline-block;
}

.article-article-info {
  float: right;
}

.article-article-info span:not(:first-child)::before {
  content: '|';
  font-size: 1.1em;
  font-weight: 300;
  margin: 0 0.5em;
  line-height: 0.9em;
}

.article-body {
  border-bottom: 2px solid;
  border-color: #77729f;
  padding: 20px 5px 20px 5px;
}

.article-share {
  padding: 10px 5px 10px 5px;
  align-content: center;
}

.article-share-btn {
  height: 30px;
  color: #d3d3d3;
  background-color: transparent;
  float: right;
}

.article-comments {
}

.article-comments-title {
  padding: 10px 5px 10px 5px;
  font-size: 20px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: #77729f;
}

.article-comments-list {
  padding: 10px 5px 10px 5px;
}

.article-comments-item {
}
</style>
