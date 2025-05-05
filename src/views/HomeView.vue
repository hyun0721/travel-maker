<template>
  <div>
    <h2>IndexedDB Demo</h2>
    <button @click="addData">Add Data</button>
    <button @click="getData">Get Data</button>
    <button @click="deleteData">Delete</button>

    <div>
      <button @click="exportData">Export</button>
      <input type="file" @change="importData"/>
    </div>
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
import { UserSettingsDB } from '@/utils/indexed-db';
import { onMounted } from 'vue';

onMounted(() => {
  
});

/**
 * 화면 ID를 객체 생성 값에 넣고, 해당 객체를 인스턴스화 하여 사용
 */
async function addData() {  
  await UserSettingsDB.searchConditions.put({
    userId: "0001", 
    custId: "cust001",
    menuId: "menu01",
    componentId: "",
    context: []
  });

  await UserSettingsDB.gridColumns.put({
    userId: "0001",
    custId: "cust001",
    menuId: "menu01",
    gridId: "",
    columns: []
  });
}

async function getData () {
  await UserSettingsDB.searchConditions.get(['0001', 'cust001', 'menu01'])
          .then((result) => {
            console.log(result);
          }).catch((error) => {
            console.error('[SearchCondition] Get Error data:', error);
          });

  await UserSettingsDB.gridColumns.get(['0001', 'cust001', 'menu01'])
          .then((result) => {
            console.log(result);
          }).catch((error) => {
            console.error('[GridColumn] Get Error data:', error);
          });
}

async function deleteData () {
  await UserSettingsDB.searchConditions.delete(['0001', 'cust001', 'menu01'])
          .then((result) => {
            console.log(result);
          }).catch((error) => {
            console.error('[SearchCondition] Delete Error data:', error);
          });

  await UserSettingsDB.gridColumns.delete(['0001', 'cust001', 'menu01'])
          .then((result) => {
            console.log(result);
          }).catch((error) => {
            console.error('[GridColumn] Delete Error data:', error);
          });
}

/**
 * 파일 추출
 * 
 * @param e 
 */
async function exportData() {
  const exportData: { [tableName: string]: any[] } = {};
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');

  // 모든 테이블 데이터를 export
  for (const table of UserSettingsDB.tables) {
    exportData[table.name] = await table.toArray();
  }

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `backup_${formattedDate}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 파일 가져오기
 * 
 * @param e 
 */
async function importData(e: Event) {
  const reader = new FileReader();
  const file = (e.target as HTMLInputElement).files?.[0] as File;

  reader.onload = async (e) => {
    const jsonString = e.target?.result as string;
    const importData = JSON.parse(jsonString);

    // 테이블 별 데이터 insert
    await UserSettingsDB.transaction('rw', UserSettingsDB.tables, async () => {
      for (const table of UserSettingsDB.tables) {
        const data = importData[table.name];
        if (Array.isArray(data)) {
          await table.bulkPut(data);
        }
      }
    });

    alert('데이터 복구 완료!');
  };

  reader.readAsText(file);
}

</script>

<style scoped></style>
