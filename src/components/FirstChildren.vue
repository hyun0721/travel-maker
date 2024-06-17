<template>
  <div class="child-content">
    <h2>Child</h2>
    <section class="container">
      <div class="item">
        <!-- 부모에게 전달받은 원본 -->
        <span>1) Origin Data : </span>
        <div>{{ props.originData }}</div>
      </div>
      <div class="item">
        <!-- 현재 컴포넌트에서 입력받을 값 -->
        <span>2) My Data : </span>
        <input type="text" v-model="myData" />
      </div>
    </section>
    <div>
      <!-- 자식에게 전달할 값 -->
      <GrandChild :originData="myData"></GrandChild>
    </div>
  </div>
</template>

<script setup lang="ts">
import GrandChild from '@/components/GrandChild.vue'
import { computed } from 'vue'

const props = defineProps<{
  originData: any
}>()

const emit = defineEmits(['update:originData'])

const myData = computed({
  get: () => props.originData,
  set: (newValue) => {
    emit('update:originData', newValue)
  }
})
</script>

<style scoped>
.child-content {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ec7741;
  border-radius: 10px;
  background-color: #f3d1bd;
  color: black;
}

.container {
  height: 70px;
}

.item {
  display: flex;

  > span {
    width: 110px;
  }
}
</style>
