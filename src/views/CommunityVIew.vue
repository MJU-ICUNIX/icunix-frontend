<template>
  <profile />
  <div>
    <div class="body">
      <div class="two">
        <LogoHeader />
        <div class="one">
          <div class="Communitymain">
            <ClassList />
            <TerminalInput placeholder=" ~/class$" class="input" />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  </div>
</template>

<script setup lang="ts">
import menuItems from '@/assets/menus'
import ClassList from '@/components/Classes/ClassList.vue'
import MenuListButton from '@/components/menuListButton.vue'
import Navbar from '@/components/Navbar.vue'
import profile from '@/components/profile.vue'
import TerminalInput from '@/components/terminalInput.vue'
import { onMounted } from 'vue'
import { useClassStore } from '@/stores/communityStore'
import LogoHeader from '@/components/LogoHeader.vue'

const classStore = useClassStore()

onMounted(async () => {
  await classStore.fetchClasses(1)
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

.logo {
  width: 338px;
  height: 120px;
}
</style>
