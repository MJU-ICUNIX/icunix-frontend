import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visiter', () => {
  const cnt = ref(0)
  const oddorEven = computed(() => (cnt.value % 2 == 0 ? '짝수' : '홀수'))
  const inc = () => cnt.value++
  const dec = () => cnt.value--

  return { cnt, oddorEven, inc, dec }
})
