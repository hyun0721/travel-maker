<template>
  <div>
    <h2>IndexedDB Demo</h2>
    <button @click="addData">Add Data</button>
    <button @click="getData">Get Data</button>
    <!-- <div v-if="data">
      <h3>Retrieved Data:</h3>
      <pre>{{ data }}</pre>
    </div>
    <div v-if="error" style="color: red">
      <h3>Error:</h3>
      <pre>{{ error }}</pre>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { CustomColumns } from '@/utils/indexed-db';

/**
 * 화면 ID를 객체 생성 값에 넣고, 해당 객체를 인스턴스화 하여 사용
 */

function addData() {
  // UserSettings.addData();
  // CustomColumns.
}

function getData () {
  // UserSettings.getData();
}

</script>

<style scoped></style>
