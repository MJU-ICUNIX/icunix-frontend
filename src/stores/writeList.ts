import { defineStore } from 'pinia'
import { ref } from 'vue'
import testlist from '@/assets/testlist'

// ✅ "writeList"라는 스토어를 만듦
export const useWriteListStore = defineStore('writeList', () => {
  // 게시글 목록을 저장할 state
  const posts = ref<any[]>([]) // 실제로는 타이핑을 해주는 게 좋음

  // 게시글 불러오기 (백엔드에서 Fetch or Axios)
  async function fetchPosts() {
    try {
      // 예시 API URL
      const response = await fetch('https://api.example.com/posts')
      const data = await response.json()
      posts.value = data
    } catch (error) {
      console.error('게시글 불러오는 중 에러 발생:', error)
    }
  }

  // 필요한 함수를 더 추가할 수 있음
  // ex) 특정 게시글 추가, 삭제, 편집 등

  return {
    posts,
    fetchPosts,
  }
})

export const usePostStore = defineStore('postStore', () => {
  const selectedPost = ref<any[]>([])
  selectedPost.value = testlist
  function setSelectedPost(post: any) {
    selectedPost.value = post
  }

  return { selectedPost, setSelectedPost }
})
