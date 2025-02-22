<template>
  <div class="classMain">
    <div class="MyClassHeader">11</div>
    <div class="myclass"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.classMain {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
}

.MyClassHeader {
  height: 40px;
  width: 100px;
  background: #77729f;
  margin-top: 10px;
  border-radius: 10px;
  align-self: flex-end;
}

.myclass {
  margin-top: 10px;
  flex: 1%;
  height: 70px;
  background: #77729f;
  border-radius: 10px;
}
</style>
