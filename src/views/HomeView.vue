<template>
  <section>
    <h1># 컴포넌트 간 통신(반응형) 예제 실습</h1>
  </section>
  <section>
    <div class="parents-content">
      <h2>Parents</h2>
      <div>
        <span>Input : </span>
        <input type="text" v-model="originData" />
      </div>
      <div>
        <FirstChildren :originData="originData"></FirstChildren>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FirstChildren from '@/components/FirstChildren.vue'

import { ref, watch } from 'vue'
/**
 * 컴포넌트 간 통신(반응형) 예제
 *
 * 1) props (ref, reactive)
 * - ref : 양방향 바인딩이 가능하나, 자식 컴포넌트의 수정사항이 반영되지 않음.
 * - reactive : 양방향 바인딩이 가능하며, 자식 컴포넌트의 수정사항이 반영됨.
 * - toRef: 단일 항목에 대해서 ref 반응성 회복
 * - toRefs: 객체 전체 범위에 대해서 ref 반응성 회복 (ex: props)
 *
 * 2) provie, inject
 *
 * 3) EventBus
 *
 * 4) computed
 */

const originData = ref('ttt')

watch(originData, (newVal, oldVal) => {
  console.log('originData : ', newVal, oldVal)
})
</script>

<style scoped>
.parents-content {
  margin: 20px;
  padding: 20px;
  border: 1px solid #f45f5f;
  border-radius: 10px;
  background-color: #ecc6c6;
  color: black;
}
</style>
