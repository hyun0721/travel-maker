<template>
  <div class="child-content">
    <h2>Child</h2>
    <section class="container">
      <div class="item">
        <span>1) Origin Data : </span>
        <div>{{ props.originData.value }}</div>
      </div>
      <div class="item">
        <span>2) My Data : </span>
        <input type="text" v-model="myData.value" />
      </div>
    </section>
    <div>
      <GrandChild :originData="myData"></GrandChild>
    </div>
  </div>
</template>

<script setup lang="ts">
import GrandChild from '@/components/GrandChild.vue'
import { reactive } from 'vue'

const props = defineProps<{
  originData: any
}>()

const myData = reactive(props.originData)
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
