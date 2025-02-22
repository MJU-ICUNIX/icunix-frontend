<template>
  <profile />
  <div class="main">
    <img src="@/assets/icunix_logo.svg" />
    <terminalInput />
    <menuListButton :items="menuItemsRef" />
  </div>
  <div class="introducce">
    <AboutIcunix />
  </div>
</template>

<script setup>
import profile from '@/components/profile.vue'
import terminalInput from '@/components/terminalInput.vue'
import menuListButton from '@/components/menuListButton.vue'
import AboutIcunix from '@/components/aboutIcunix.vue'
import menuItems from '@/assets/menus'

const menuItemsRef = menuItems
</script>

<style>
.introducce {
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 100px 0; /* 상하 여백 예시 */
}

.main {
  max-width: 700px;
  margin: 0 auto; /* 수평 중앙 배치 */

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  /* 화면 높이만큼 차지 (헤더 등이 없다는 전제 하에) */
  min-height: 100vh; /* 뷰포트를 꽉 채우기 위해 min-height 사용 */

  /* (옵션) 수직 가운데 정렬 */
  justify-content: center;
}
</style>
