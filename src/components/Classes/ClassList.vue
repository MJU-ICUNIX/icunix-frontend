<template>
  <div class="ClassListMain">
    <div class="upperClass">
      <div class="announce">11</div>
      <div class="activity">11</div>
      <MyClasses />
    </div>
    <div class="lowerClass">
      <ClassSearchBar />
      <Classes />
    </div>
  </div>
</template>

<script setup lang="ts">
import Classes from './ClassesGrid.vue'
import ClassSearchBar from './ClassSearchBar.vue'
import MyClasses from './MyClasses.vue'
</script>

<style>
.ClassListMain {
  background: #26232d;
  width: 1100px;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
}
/* 
.ClassListMain > div:not(:last-child) {
  margin-bottom: 10px;
} */

.upperClass {
  display: flex;
  gap: 25px;
  margin-top: 10px;
  height: 200px;
  margin-bottom: 30px;
  background: rgb(32, 32, 32);
  padding: 15px;
  border-radius: 10px;
}

.lowerClass {
  background: rgb(32, 32, 32);
  padding: 15px;
  border-radius: 10px;
}

.announce,
.activity {
  flex: 1;
  background: #77729f;
  border-radius: 10px;
}

.classes {
  background: #77729f;
  border-radius: 10px;
  width: 100%;
  height: 400px;
}
</style>
