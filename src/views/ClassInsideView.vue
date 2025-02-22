<template>
  <profile />
  <div>
    <div class="body">
      <div class="two">
        <LogoHeader />
        <div class="one">
          <div class="Communitymain">
            <InClass />
            <TerminalInput placeholder=" ~/rally$" class="input" />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import menuItems from '@/assets/menus'
import InClass from '@/components/Classes/InClass.vue'
import LogoHeader from '@/components/LogoHeader.vue'
import MenuListButton from '@/components/menuListButton.vue'
import Navbar from '@/components/Navbar.vue'
import profile from '@/components/profile.vue'
import TerminalInput from '@/components/terminalInput.vue'
import { useClassStore } from '@/stores/communityStore'
import { onMounted, computed } from 'vue'

const classStore = useClassStore()
const categories = computed(() => classStore.categories)
// const classitem = classStore.classStoreData.classes.find((cls) => {
//   return cls.id == classID
// })

const props = defineProps<{
  classId: string
  categoryName: string
}>()

onMounted(async () => {
  const classId = classStore.selectedClass?.id ? classStore.selectedClass?.id : 0
  await classStore.fetchCategoriesForClass(0, classId)
  await classStore.setSelectedCategory(1)
})
</script>

<style>
.body {
  display: flex;
  justify-content: center;
  padding: 50px;
  gap: 30px;
}

/* .Communitymain {
  gap: 30px;
} */

.one {
  display: flex;
  gap: 30px;
}

.classHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 30px;
}

.logo {
  width: 338px;
  height: 120px;
}
</style>
