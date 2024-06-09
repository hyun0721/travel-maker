<template>
  <div class="grandchild-content">
    <div>
      <h2>Grand Child</h2>
    </div>
    <section class="container">
      <div class="item">
        <span>1) Origin Data: </span>
        <div>{{ props.originData.value }}</div>
      </div>
      <div class="item">
        <span>2) My Data: </span>
        <input type="text" v-model="myData.value" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
  originData: any
}>()

const myData = reactive(props.originData)
</script>

<style scoped>
.grandchild-content {
  margin: 20px;
  padding: 20px;
  border: 1px solid #0ed62c;
  border-radius: 10px;
  background-color: #bcf590;
  color: black;
}

.container {
  height: 100px;
}

.item {
  display: flex;

  > span {
    width: 110px;
  }
}
</style>
