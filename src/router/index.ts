import { createRouter, createWebHistory } from 'vue-router'

const mainRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityVIew.vue'),
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/MyPage.vue'),
    },
    {
      path: '/creatclass',
      name: 'creatclass',
      component: () => import('../views/CreateClass.vue'),
    },
    {
      path: '/contest',
      name: 'contest',
      component: () => import('../views/ContestView.vue'),
    },
    // {
    //   path: '/classId',
    //   name: 'class',
    //   component: () => import('../views/ClassInsideView.vue'),
    // },
    {
      path: '/:classId/:categoryName', // ✅ 동적 경로 설정
      name: 'classes',
      component: () => import('../views/ClassInsideView.vue'),
      props: true, // ✅ URL의 `category`를 컴포넌트 `props`로 전달
    },
    // {
    //   path: '/:classId/:postId', // ✅ 동적 경로 설정
    //   name: 'post',
    //   component: () => import('../views/TextMainView.vue'),
    //   props: true, // ✅ URL의 `category`를 컴포넌트 `props`로 전달
    // },
    {
      path: '/:classId/:categoryId/:postId', // ✅ 동적 경로 설정
      name: 'postWithCategory',
      component: () => import('../views/TextMainView.vue'),
      props: true, // ✅ URL의 `category`를 컴포넌트 `props`로 전달
    },
    {
      path: '/:classId/write', // ✅ 동적 경로 설정
      name: 'write',
      component: () => import('../views/WriteView.vue'),
      props: true, // ✅ URL의 `category`를 컴포넌트 `props`로 전달
    },
  ],
})

export default mainRouter
