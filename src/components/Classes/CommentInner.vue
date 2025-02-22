<template>
  <div class="cmt-bg">
    <div class="cmt-item">
      <div class="cmt-header">
        <div class="cmt-owner">{{ prop.cmt.owner }}</div>
        <!-- <div class="inner-create_at"></div> -->
      </div>
      <div class="cmt-body">{{ prop.cmt.comments }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentItem } from '@/interfaces/Community_interface'
const prop = defineProps<{ cmt: CommentItem }>()
</script>

<style>
.cmt-bg {
  width: 100%;
  margin-bottom: 0.9rem;
}

.cmt-item {
  border: 2px solid;
  border-color: rgb(59, 59, 59);
}

.cmt-header {
  padding: 5px 10px 5px 10px;
  background: rgb(59, 59, 59);
}

.cmt-body {
  padding: 5px 10px 5px 10px;
}
</style>
