<template>
  <div class="profile">
    <router-link :to="{ name: 'mypage' }"> 이미지추가 </router-link>
  </div>
</template>

<script>
export default {
  name: 'VueInit',
  components: {},
  data() {
    return {
      sampleData: '',
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {},
}
</script>

<style>
.profile {
  position: fixed;
  top: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  background: #77729f;
  border-radius: 50%;
}

.profile:hover {
  cursor: pointer;
}
</style>
