<template>
  <div>
    <div class="dial-menu" @wheel.prevent="onWheel">
      <!-- 좌측 버튼 -->
      <button class="arrow-btn-twice left" @click="prevMenu_twice"></button>
      <button class="arrow-btn left" @click="prevMenu"></button>

      <!-- 중앙 버튼 (현재 선택된 메뉴 표시) -->
      <button class="center-button" @click="route">
        {{ currentItem?.label }}
        <!-- 혹은 아이콘/이미지 표시 -->
      </button>

      <!-- 우측 버튼 -->
      <button class="arrow-btn right" @click="nextMenu"></button>
      <button class="arrow-btn-twice right" @click="nextMenu_twice"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { DialMenuProps } from '@/interfaces/Community_interface'

const router = useRouter()

const props = defineProps<DialMenuProps>()

// 현재 선택 인덱스
const currentIndex = ref(props.initialIndex ?? 0)

// 현재 선택된 메뉴 아이템
const currentItem = computed(() => {
  return props.items[currentIndex.value]
})

function route() {
  router.push({ name: currentItem.value.label })
}

function prevMenu_twice() {
  const len = props.items.length

  currentIndex.value = (currentIndex.value - 2 + len) % len
}

function nextMenu_twice() {
  const len = props.items.length
  // 1-based index: (currentIndex - 1)로 0-based 변환
  // +2만큼 이동 후 나머지를 len으로 취한 뒤
  // 다시 +1하여 1-based로 복구
  currentIndex.value = (currentIndex.value + 2) % len
}

function prevMenu() {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : props.items.length - 1
}

function nextMenu() {
  currentIndex.value = currentIndex.value < props.items.length - 1 ? currentIndex.value + 1 : 0
}

function onWheel(e: WheelEvent) {
  if (e.deltaY < 0) {
    prevMenu()
  } else {
    nextMenu()
  }
}
</script>

<style scoped>
.dial-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 1rem;
}

.center-button {
  width: 80px;
  height: 80px;
  background-color: #77729f;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
}

.arrow-btn {
  background-color: #77729f;
  color: #ffffff;
  border-radius: 18px;
  width: 30px;
  height: 70px;
  border: none;
  cursor: pointer;
}

.arrow-btn-twice {
  background-color: #77729f;
  color: #ffffff;
  border-radius: 18px;
  width: 20px;
  height: 55px;
  border: none;
  cursor: pointer;
}
</style>
