<template>
  <div class="nav">
    <div class="navMain">
      <div class="calendar">calendar</div>
      <div class="univercity">univercity</div>
      <div class="classList">classList</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.nav {
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  background: #2c2934;
  margin-top: 150px;
  height: max-content;
}

.navMain > div:not(:last-child) {
  margin-bottom: 20px;
}

.navMain {
  background: rgb(32, 32, 32);
  padding: 10px;
  border-radius: 10px;
}

.calendar {
  height: 150px;
  border-radius: 10px;
  background: #77729f;
}

.univercity {
  height: 200px;
  border-radius: 10px;
  background: #77729f;
}

.classList {
  height: 400px;
  border-radius: 10px;
  background: #77729f;
}
</style>
