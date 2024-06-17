<template>
  <div class="grandchild-content">
    <div>
      <h2>Grand Child</h2>
    </div>
    <section class="container">
      <div class="item">
        <span>1) Origin Data: </span>
        <div>{{ props.originData }}</div>
      </div>
      <div class="item">
        <span>2) My Data: </span>
        <input type="text" v-model="myData" />
        <!-- <input type="text" v-model="myData1" />
        <input type="text" v-model="originData" /> -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{
  originData: any
}>()

// const myData = ref(props.originData)
const myData = toRef(props, 'originData')
// const { originData } = toRefs(props)
// const myData = props.originData        // 마운트 이후 반응성을 갖지 않으므로, 부모 변경점을 반영하지 못함.
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
