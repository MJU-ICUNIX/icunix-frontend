<template>
  <div class="two">
    <div class="classHeader">
      <img src="../assets/icunix_logo.svg" class="logo" />
      <MenuListButton :items="menuItems" />
    </div>
  </div>
</template>

<script setup lang="ts">
import menuItems from '@/assets/menus'
import ClassList from '@/components/Classes/ClassList.vue'
import MenuListButton from '@/components/menuListButton.vue'
</script>

<style>
.classHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 30px;
}
</style>
